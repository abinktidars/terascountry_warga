import { reactive, computed } from 'vue'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

// ───────────────────────── constants ─────────────────────────
const SENSITIVE = ['ipl', 'warga', 'piket', 'cctv', 'keluhan', 'surat']
const FEE = 250000
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const DUE_IDX = 9 // Oktober

// [key, label, icon, sub, color, tint]
const MODS = [
  ['beranda', 'Beranda', 'home', '', '#A84503', '#F7EFE5'],
  ['ipl', 'Pembayaran IPL', 'payments', 'Bayar iuran', '#D45A1A', '#FEEBDD'],
  ['warga', 'Data Warga', 'groups', 'Status huni', '#3554D1', '#E4EAFF'],
  ['paguyuban', 'Paguyuban', 'account_tree', 'Struktur pengurus', '#7048D6', '#EEE8FD'],
  ['kegiatan', 'Kegiatan Warga', 'event', 'Agenda komplek', '#B8325F', '#FDE6EE'],
  ['piket', 'Jadwal Security', 'shield_person', 'Piket & shift', '#0A7C3A', '#DDF1E4'],
  ['cctv', 'CCTV', 'videocam', 'Segera hadir', '#5B4A3E', '#EFE8E0'],
  ['keluhan', 'Lapor Keluhan', 'campaign', 'Sampaikan masalah', '#C2410C', '#FDE9DC'],
  ['surat', 'Unduh Surat', 'description', 'Pengantar RT/RW', '#3554D1', '#E4EAFF'],
  ['aset', 'Aset Komplek', 'inventory_2', 'Fasilitas & inventaris', '#0A7C3A', '#DDF1E4'],
  ['sosial', 'Info Sosial', 'diversity_3', 'Rekomendasi warga', '#7048D6', '#EEE8FD']
]

const ADM_TITLES = { adm_dash: 'Dashboard Pengurus', adm_ipl: 'Keuangan IPL', adm_keluhan: 'Kelola Keluhan', adm_warga: 'Kelola Data Warga', adm_info: 'Pengumuman' }

// [blok, unit, nama]  (default status is derived separately so the C2 No. 14
// special-case from the original prototype — which flips with paidUpTo — can
// be reproduced exactly)
const RAW_UNITS = [
  ['A1', 'A1 No. 02', 'Budi Santoso'], ['A1', 'A1 No. 05', 'Siti Rahmawati'], ['A2', 'A2 No. 11', 'Hendra Wijaya'],
  ['B3', 'B3 No. 01', 'Rina Kusuma'], ['B4', 'B4 No. 08', 'Yusuf Maulana'], ['C2', 'C2 No. 14', 'Andi Pratama'],
  ['C2', 'C2 No. 16', 'Dimas Saputra'], ['C4', 'C4 No. 09', 'Lestari Dewi'], ['D2', 'D2 No. 12', 'Agus Firmansyah'], ['D3', 'D3 No. 05', 'Bambang Haryanto']
]
const UNIT_DEFAULT_STATUS = {
  'A1 No. 02': 'Lunas', 'A1 No. 05': 'Menunggu', 'A2 No. 11': 'Belum',
  'B3 No. 01': 'Lunas', 'B4 No. 08': 'Menunggu',
  'C2 No. 16': 'Belum', 'C4 No. 09': 'Lunas', 'D2 No. 12': 'Menunggu', 'D3 No. 05': 'Belum'
}

const ST = { Pemilik: ['Dihuni Pemilik', '#DDF1E4', '#0A5C2C'], Kontrak: ['Kontrak/Sewa', '#E4EAFF', '#22357A'], Kosong: ['Kosong', '#F3ECE2', '#6B5848'] }
const WARGA_FILTER_MAP = { 'Semua': null, 'Dihuni Pemilik': 'Pemilik', 'Kontrak/Sewa': 'Kontrak', 'Kosong': 'Kosong' }

// [id, day, mon, title, time, place, cat, color, tint]
const EV = [
  ['k1', '12', 'OKT', 'Kerja Bakti Bulanan', '07.00', 'Seluruh blok', 'Lingkungan', '#0A7C3A', '#DDF1E4'],
  ['k2', '19', 'OKT', 'Senam Pagi Bersama', '06.30', 'Lapangan Utama', 'Olahraga', '#D45A1A', '#FEEBDD'],
  ['k3', '26', 'OKT', 'Posyandu Balita & Lansia', '09.00', 'Balai Warga', 'Kesehatan', '#B8325F', '#FDE6EE'],
  ['k4', '02', 'NOV', 'Rapat Pleno Paguyuban', '19.30', 'Balai Warga', 'Rapat', '#7048D6', '#EEE8FD']
]
const PAST_EVENTS = [
  { title: 'Lomba 17 Agustus', date: '17 Agustus 2026' },
  { title: 'Pengajian Bulanan', date: '6 September 2026' },
  { title: 'Fogging Nyamuk DBD', date: '20 September 2026' }
]

const PIKET_DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
const PIKET_CREW = [['Joko & Rudi', 'Slamet & Yanto', 'Eko & Wawan'], ['Slamet & Yanto', 'Eko & Wawan', 'Joko & Rudi'], ['Eko & Wawan', 'Joko & Rudi', 'Slamet & Yanto']]
const SHIFTS = [
  { name: 'Pagi', hours: '06.00 – 14.00', icon: 'wb_sunny', color: '#D45A1A', tint: '#FEEBDD' },
  { name: 'Siang', hours: '14.00 – 22.00', icon: 'wb_twilight', color: '#7048D6', tint: '#EEE8FD' },
  { name: 'Malam', hours: '22.00 – 06.00', icon: 'dark_mode', color: '#3554D1', tint: '#E4EAFF' }
]
const CAMS = ['CAM 01 · Gerbang Utama', 'CAM 02 · Gerbang Belakang', 'CAM 03 · Jl. Teras Raya', 'CAM 04 · Taman Bermain', 'CAM 05 · Lapangan', 'CAM 06 · Balai Warga']

const CS = { Diterima: ['#FEEBDD', '#B4460F'], Diproses: ['#E4EAFF', '#22357A'], Selesai: ['#DDF1E4', '#0A5C2C'] }

const US = { Lunas: ['Lunas', '#DDF1E4', '#0A5C2C', 'Dibayar via VA'], Menunggu: ['Menunggu Verifikasi', '#FFF3D6', '#8A5A00', 'Bukti transfer diunggah'], Belum: ['Belum Bayar', '#FEEBDD', '#B4460F', 'Jatuh tempo 10 Okt'] }
const UNIT_FILTER_MAP = { 'Semua': null, 'Lunas': 'Lunas', 'Menunggu Verifikasi': 'Menunggu', 'Belum Bayar': 'Belum' }

// [title, meta]
const LETTERS = [
  ['Surat Pengantar RT', 'DOCX · 24 KB'], ['Surat Pengantar RW', 'DOCX · 24 KB'], ['Surat Keterangan Domisili', 'DOCX · 28 KB'],
  ['Surat Pengantar Nikah (N1)', 'PDF · 112 KB'], ['Surat Keterangan Usaha', 'DOCX · 26 KB'], ['Izin Renovasi Rumah', 'PDF · 86 KB'],
  ['Izin Keramaian / Acara', 'DOCX · 22 KB'], ['Surat Pindah Domisili', 'DOCX · 25 KB']
]

// [nama, jml, lokasi, kategori, icon, kondisi]
const AS = [
  ['Balai Warga', '1 unit', 'Blok A', 'Gedung', 'home_work', 'Baik'], ['Lapangan Badminton', '2 lapangan', 'Area Utama', 'Fasilitas', 'sports_tennis', 'Baik'],
  ['Taman Bermain Anak', '1 area', 'Blok C', 'Fasilitas', 'park', 'Perlu Perbaikan'], ['Pos Security', '2 unit', 'Gerbang Utama & Belakang', 'Gedung', 'shield', 'Baik'],
  ['Genset 10 kVA', '1 unit', 'Balai Warga', 'Peralatan', 'bolt', 'Baik'], ['Kursi Lipat', '120 buah', 'Gudang Balai', 'Peralatan', 'chair', 'Baik'],
  ['Tenda Acara 4×6 m', '3 set', 'Gudang Balai', 'Peralatan', 'festival', 'Baik'], ['Sound System', '1 set', 'Balai Warga', 'Peralatan', 'speaker', 'Perlu Perbaikan']
]

// [kategori, nama, desc, rating, rec]
const SO = [
  ['Tukang', 'Pak Darto — Renovasi & Bangunan', 'Renovasi rumah, plafon, cat, dan keramik. Rapi dan tepat waktu.', '4.8', 23],
  ['Tukang', 'Mas Ipin Service AC', 'Cuci, isi freon, dan bongkar pasang AC. Bisa datang hari yang sama.', '4.9', 31],
  ['Sekolah', 'TK Tunas Cendekia', 'TK dan playgroup 5 menit dari gerbang utama. Kelas kecil maksimal 15 anak.', '4.7', 12],
  ['Sekolah', 'SD Harapan Bangsa', 'SD swasta dengan program bilingual dan antar-jemput ke komplek.', '4.6', 18],
  ['Kesehatan', 'Klinik Pratama Sehat Keluarga', 'Dokter umum & gigi, buka sampai 21.00. Menerima BPJS.', '4.7', 27],
  ['Kuliner', 'Katering Bu Ani (Blok B2)', 'Katering harian dan nasi kotak acara warga. Pesan H-1.', '4.9', 40]
]

const CONTACTS = [
  { icon: 'shield_person', label: 'Pos Security', sub: 'Gerbang Utama · 24 jam', phone: '0812-0000-1111' },
  { icon: 'apartment', label: 'Sekretariat Paguyuban', sub: 'Balai Warga · 09.00–16.00', phone: '0812-0000-0000' },
  { icon: 'local_hospital', label: 'Ambulans Kelurahan', sub: 'Darurat', phone: '0812-0000-2222' }
]

const PENGURUS_INTI = [
  { ini: 'HS', nama: 'H. Sutrisno', jabatan: 'Ketua Paguyuban', blok: 'Blok A1 No. 01', color: '#A84503', tint: '#F7EFE5' },
  { ini: 'RK', nama: 'Rina Kusuma', jabatan: 'Wakil Ketua', blok: 'Blok B3 No. 01', color: '#7048D6', tint: '#EEE8FD' },
  { ini: 'DS', nama: 'Dimas Saputra', jabatan: 'Sekretaris', blok: 'Blok C2 No. 16', color: '#3554D1', tint: '#E4EAFF' },
  { ini: 'LD', nama: 'Lestari Dewi', jabatan: 'Bendahara', blok: 'Blok C4 No. 09', color: '#0A7C3A', tint: '#DDF1E4' }
]
const PENGURUS_BIDANG = [
  { bidang: 'Koordinator Keamanan', nama: 'Agus Firmansyah' }, { bidang: 'Koordinator Kebersihan & Lingkungan', nama: 'Budi Santoso' },
  { bidang: 'Koordinator Sosial & Kerohanian', nama: 'Siti Rahmawati' }, { bidang: 'Koordinator Olahraga & Pemuda', nama: 'Hendra Wijaya' },
  { bidang: 'Ketua RT 01', nama: 'Bambang Haryanto' }, { bidang: 'Ketua RT 02', nama: 'Yusuf Maulana' }, { bidang: 'Ketua RT 03', nama: 'Andi Pratama' }
]


// ───────────────────────── reactive state (singleton) ─────────────────────────
const state = reactive({
  role: 'public', screen: 'app', redirect: null, page: 'beranda',
  w: typeof window !== 'undefined' ? window.innerWidth : 1280,
  drawer: false, notif: false, pay: false, paid: false, payMonths: null, method: 'va', paidUpTo: 8,
  q: '', wf: 'Semua', af: 'Semua', sf: 'Semua', uf: 'Semua', cf: 'Semua', joined: {},
  loginTab: 'warga', loginId: '', loginPw: '', showPw: false, loginErr: '',
  form: { cat: 'Keamanan', lokasi: '', desc: '' }, ann: { title: '', body: '', aud: 'publik' }, toast: '',
  complaints: [
    { id: 'K-0415', cat: 'Keamanan', date: '4 Okt', desc: 'Ada orang tidak dikenal mondar-mandir di Blok D malam hari.', lokasi: 'Jl. Teras Indah Blok D', status: 'Diterima', reporter: 'Agus Firmansyah', mine: false },
    { id: 'K-0412', cat: 'Fasilitas', date: '28 Sep', desc: 'Lampu PJU di depan taman bermain mati sejak 3 hari.', lokasi: 'Taman Bermain Blok C', status: 'Diproses', reporter: 'Andi Pratama', mine: true },
    { id: 'K-0405', cat: 'Lingkungan', date: '22 Sep', desc: 'Saluran air depan Blok A2 tersumbat saat hujan.', lokasi: 'Blok A2', status: 'Diproses', reporter: 'Hendra Wijaya', mine: false },
    { id: 'K-0398', cat: 'Kebersihan', date: '15 Sep', desc: 'Sampah belum diangkut hari Senin.', lokasi: 'Jl. Teras Raya Blok C', status: 'Selesai', reporter: 'Andi Pratama', mine: true }
  ],
  announcements: [
    { id: 1, date: '1 Okt 2026', aud: 'publik', title: 'Penyesuaian jam buka gerbang belakang', body: 'Mulai 7 Oktober, gerbang belakang dibuka pukul 05.00–22.00. Di luar jam tersebut gunakan gerbang utama.' },
    { id: 2, date: '30 Sep 2026', aud: 'warga', title: 'Laporan keuangan paguyuban Q3 tersedia', body: 'Ringkasan pemasukan IPL dan pengeluaran Juli–September dapat diminta di sekretariat atau dilihat saat rapat pleno.' },
    { id: 3, date: '27 Sep 2026', aud: 'publik', title: 'Pemadaman listrik terjadwal', body: 'PLN akan melakukan pemeliharaan jaringan Sabtu, 11 Oktober pukul 09.00–13.00 untuk Blok C dan D.' },
    { id: 4, date: '20 Sep 2026', aud: 'warga', title: 'Pendataan ulang kendaraan warga', body: 'Mohon perbarui data kendaraan di pos security untuk penerbitan stiker akses baru.' }
  ],
  units: {},
  residents: [],
  wargaForm: { id: null, blok: '', unit: '', nama: '', jumlah: 0, status: 'Pemilik', phone: '' },
  wargaFormOpen: false
})

let toastTimer = null
let onResizeHandler = null
let unsubscribeAuth = null
let unsubscribeResidents = null
let authInitialized = false

// ───────────────────────── small helpers ─────────────────────────
const rp = n => 'Rp ' + n.toLocaleString('id-ID')
const chip = a => (a ? { bg: '#2A1D14', fg: '#fff', bd: '#2A1D14' } : { bg: '#fff', fg: '#5E4B3C', bd: '#EFE6DA' })

function flash(msg) {
  clearTimeout(toastTimer)
  state.toast = msg
  toastTimer = setTimeout(() => { state.toast = '' }, 2400)
}

function authErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email atau kata sandi salah.'
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan. Coba lagi nanti.'
    default:
      return 'Gagal masuk. Coba lagi.'
  }
}

function applyRole(role) {
  if (role === 'login') { state.role = 'public'; state.screen = 'login'; state.page = 'beranda'; return }
  if (!['public', 'warga', 'pengurus'].includes(role)) role = 'public'
  state.role = role
  state.screen = 'app'
  state.page = role === 'pengurus' ? 'adm_dash' : 'beranda'
}

function go(p) {
  if (state.role === 'public' && SENSITIVE.includes(p)) {
    state.screen = 'login'; state.redirect = p; state.drawer = false; state.loginErr = ''; state.loginTab = 'warga'
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
    return
  }
  if (p.startsWith('adm_') && state.role !== 'pengurus') return
  state.page = p; state.drawer = false; state.notif = false
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
}

function watchResidents(active) {
  if (unsubscribeResidents) { unsubscribeResidents(); unsubscribeResidents = null }
  state.residents = []
  if (!active) return
  unsubscribeResidents = onSnapshot(collection(db, 'residents'), snap => {
    state.residents = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  }, () => { /* no access, keep empty */ })
}

function initApp() {
  onResizeHandler = () => { state.w = window.innerWidth }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResizeHandler)
    onResizeHandler()
  }
  unsubscribeAuth = onAuthStateChanged(auth, async fbUser => {
    watchResidents(!!fbUser)
    const wasInitialized = authInitialized
    authInitialized = true
    if (!wasInitialized) {
      if (!fbUser) { applyRole('public'); return }
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid))
        applyRole(snap.exists() ? snap.data().role : 'warga')
      } catch (e) {
        applyRole('public')
      }
      return
    }
    // perubahan berikutnya (login/logout) sudah ditangani langsung oleh doLogin()/logout();
    // di sini cukup jaga-jaga kalau sesi berakhir di luar aksi logout eksplisit
    if (!fbUser) applyRole('public')
  })
}

function teardownApp() {
  if (typeof window !== 'undefined' && onResizeHandler) window.removeEventListener('resize', onResizeHandler)
  if (unsubscribeAuth) unsubscribeAuth()
  if (unsubscribeResidents) unsubscribeResidents()
  clearTimeout(toastTimer)
}

// ───────────────────────── derived / computed values ─────────────────────────
const isDesktop = computed(() => state.w >= 1024)
const isCompact = computed(() => !isDesktop.value)
const wide = computed(() => state.w >= 900)
const narrow = computed(() => !wide.value)

const isPublic = computed(() => state.role === 'public')
const isAdmin = computed(() => state.role === 'pengurus')
const isLogged = computed(() => !isPublic.value)

const user = computed(() => isAdmin.value
  ? { ini: 'HS', name: 'H. Sutrisno', full: 'Bapak H. Sutrisno', sub: 'Ketua Paguyuban', unit: 'Blok A1 No. 01 · RT 01 / RW 07', color: '#2A1D14' }
  : { ini: 'AP', name: 'Andi Pratama', full: 'Bapak Andi Pratama', sub: 'Blok C2 No. 14', unit: 'Blok C2 No. 14 · RT 03 / RW 07', color: '#A84503' })

const roleLabel = computed(() => isAdmin.value ? 'Panel Pengurus' : isPublic.value ? 'Portal Warga' : 'Portal Warga · Masuk')

const UNITS = computed(() => RAW_UNITS.map(u => {
  const unit = u[1]
  const defStatus = unit === 'C2 No. 14' ? (state.paidUpTo > 9 ? 'Lunas' : 'Belum') : UNIT_DEFAULT_STATUS[unit]
  return { blok: u[0], unit, nama: u[2], status: state.units[unit] || defStatus }
}))
const pendingCount = computed(() => UNITS.value.filter(u => u.status === 'Menunggu').length)
const openComplaints = computed(() => state.complaints.filter(c => c.status !== 'Selesai').length)

function mk(key, label, icon, extra) {
  const active = state.page === key
  return {
    label, icon,
    go: () => go(key),
    navBg: active ? '#F7EFE5' : 'transparent',
    navFg: active ? '#A84503' : '#4A3828',
    navW: active ? 700 : 500,
    locked: isPublic.value && SENSITIVE.includes(key),
    soon: key === 'cctv',
    badge: false,
    ...(extra || {})
  }
}
const portalItems = computed(() => MODS.map(m => mk(m[0], m[1], m[2])))
const navGroups = computed(() => isAdmin.value
  ? [
      { title: 'Panel Pengurus', items: [mk('adm_dash', 'Dashboard', 'space_dashboard'), mk('adm_ipl', 'Keuangan IPL', 'account_balance_wallet', { badge: pendingCount.value || false }), mk('adm_keluhan', 'Kelola Keluhan', 'support_agent', { badge: openComplaints.value || false }), mk('adm_warga', 'Kelola Warga', 'manage_accounts'), mk('adm_info', 'Pengumuman', 'campaign')] },
      { title: 'Portal Warga', items: portalItems.value }
    ]
  : [{ title: '', items: portalItems.value }])

const services = computed(() => MODS.slice(1).map(([key, label, icon, sub, color, tint]) => ({ label, icon, sub, color, tint, locked: isPublic.value && SENSITIVE.includes(key), go: () => go(key) })))

function bnItem(k, l, i) {
  return { label: l, icon: i, go: () => go(k), bg: state.page === k ? '#F7EFE5' : 'transparent', fg: state.page === k ? '#A84503' : '#6B5848' }
}
function moreItem() {
  return { label: 'Lainnya', icon: 'apps', go: () => { state.drawer = true }, bg: state.drawer ? '#F7EFE5' : 'transparent', fg: '#6B5848' }
}
const bottomNav = computed(() => isAdmin.value
  ? [bnItem('adm_dash', 'Dashboard', 'space_dashboard'), bnItem('adm_ipl', 'IPL', 'account_balance_wallet'), bnItem('adm_keluhan', 'Keluhan', 'support_agent'), bnItem('adm_info', 'Info', 'campaign'), moreItem()]
  : isPublic.value
    ? [bnItem('beranda', 'Beranda', 'home'), bnItem('kegiatan', 'Kegiatan', 'event'), bnItem('paguyuban', 'Pengurus', 'account_tree'), bnItem('sosial', 'Info', 'diversity_3'), { label: 'Masuk', icon: 'login', go: () => { state.screen = 'login'; state.redirect = null }, bg: 'transparent', fg: '#A84503' }]
    : [bnItem('beranda', 'Beranda', 'home'), bnItem('ipl', 'IPL', 'payments'), bnItem('kegiatan', 'Kegiatan', 'event'), bnItem('keluhan', 'Lapor', 'campaign'), moreItem()])

const cur = computed(() => MODS.find(m => m[0] === state.page))
const pageTitle = computed(() => ADM_TITLES[state.page] || (state.page === 'beranda' ? 'Beranda' : cur.value ? cur.value[1] : ''))
const crumb = computed(() => state.page.startsWith('adm_') ? 'Panel Pengurus' : 'Portal Warga Teras Country')
const greeting = computed(() => {
  const hr = new Date().getHours()
  return hr < 11 ? 'Selamat pagi' : hr < 15 ? 'Selamat siang' : hr < 18 ? 'Selamat sore' : 'Selamat malam'
})

const is = computed(() => Object.fromEntries([...MODS.map(m => m[0]), ...Object.keys(ADM_TITLES)].map(k => [k, state.page === k])))
const showPublicHome = computed(() => state.page === 'beranda' && isPublic.value)
const showWargaHome = computed(() => state.page === 'beranda' && isLogged.value)
const showWargaData = computed(() => state.page === 'warga' || state.page === 'adm_warga')
const isAdminWarga = computed(() => state.page === 'adm_warga')

// screen / navigation actions
function openLogin() { state.screen = 'login'; state.redirect = null; state.drawer = false; state.loginErr = ''; if (typeof window !== 'undefined') window.scrollTo(0, 0) }
function backHome() { state.screen = 'app'; state.page = state.role === 'pengurus' ? 'adm_dash' : 'beranda' }
async function logout() {
  await signOut(auth)
  state.role = 'public'; state.page = 'beranda'; state.drawer = false; state.notif = false; state.screen = 'app'
  flash('Anda telah keluar')
}

// login
const loginSub = computed(() => state.redirect ? 'Halaman ini berisi data warga. Silakan masuk untuk melanjutkan.' : 'Masuk dengan akun yang diberikan oleh sekretariat paguyuban.')
const loginTabs = computed(() => [['warga', 'Warga'], ['pengurus', 'Pengurus']].map(([k, l]) => ({
  label: l,
  bg: state.loginTab === k ? '#fff' : 'transparent',
  fg: state.loginTab === k ? '#2A1D14' : '#6B5848',
  sh: state.loginTab === k ? '0 1px 3px rgba(42,29,20,0.12)' : 'none',
  pick: () => { state.loginTab = k; state.loginErr = '' }
})))
function setLoginId(e) { state.loginId = e.target.value; state.loginErr = '' }
function setLoginPw(e) { state.loginPw = e.target.value; state.loginErr = '' }
const pwType = computed(() => state.showPw ? 'text' : 'password')
const pwIcon = computed(() => state.showPw ? 'visibility_off' : 'visibility')
function togglePw() { state.showPw = !state.showPw }
const loginBtn = computed(() => state.loginTab === 'pengurus' ? 'Masuk sebagai Pengurus' : 'Masuk')
function fillDemo() {
  state.loginId = state.loginTab === 'pengurus' ? 'ketua@terascountry.id' : 'andi@terascountry.id'
  state.loginPw = 'demo1234'
  state.loginErr = ''
}
async function doLogin() {
  if (!state.loginId.trim() || !state.loginPw.trim()) { state.loginErr = 'Isi email dan kata sandi.'; return }
  state.loginErr = ''
  try {
    const cred = await signInWithEmailAndPassword(auth, state.loginId.trim(), state.loginPw)
    const snap = await getDoc(doc(db, 'users', cred.user.uid))
    const role = snap.exists() ? snap.data().role : 'warga'
    const page = role === 'pengurus' ? (state.redirect || 'adm_dash') : (state.redirect || 'beranda')
    state.role = role; state.screen = 'app'; state.page = page; state.redirect = null; state.loginPw = ''
    flash(role === 'pengurus' ? 'Masuk sebagai Pengurus' : 'Selamat datang')
  } catch (e) {
    state.loginErr = authErrorMessage(e.code)
  }
}

// drawer / notif
const drawerOpen = computed(() => state.drawer)
function openDrawer() { state.drawer = true }
function closeDrawer() { state.drawer = false }
function stop(e) { e.stopPropagation() }
const notifOpen = computed(() => state.notif && isLogged.value)
function toggleNotif() { state.notif = !state.notif }
const notifs = computed(() => isAdmin.value
  ? [{ icon: 'account_balance_wallet', text: pendingCount.value + ' pembayaran IPL menunggu verifikasi.', time: 'Hari ini' }, { icon: 'support_agent', text: 'Keluhan baru #K-0415 (Keamanan).', time: '1 hari lalu' }]
  : [{ icon: 'payments', text: 'Tagihan IPL Oktober 2026 telah terbit.', time: '4 hari lalu' }, { icon: 'event', text: 'Kerja bakti bulanan Minggu, 12 Oktober.', time: '5 hari lalu' }, { icon: 'campaign', text: 'Laporan K-0412 sedang diproses.', time: '1 minggu lalu' }])

// ipl
const unpaid = computed(() => { const arr = []; for (let i = state.paidUpTo; i <= DUE_IDX; i++) arr.push(i); return arr })
const outstanding = computed(() => unpaid.value.length * FEE)
const outstandingFmt = computed(() => rp(outstanding.value))
const outstandingNote = computed(() => outstanding.value ? unpaid.value.length + ' bulan · ' + unpaid.value.map(i => MONTHS[i]).join(', ') : 'Semua tagihan sudah lunas')
const iplStatus = computed(() => outstanding.value ? { label: 'Belum Lunas', bg: '#FEEBDD', fg: '#B4460F' } : { label: 'Lunas', bg: '#DDF1E4', fg: '#0A5C2C' })
const paidYearFmt = computed(() => rp(state.paidUpTo * FEE))
const paidCount = computed(() => state.paidUpTo)
const iplRows = computed(() => MONTHS.map((m, i) => {
  const paid = i < state.paidUpTo, due = i <= DUE_IDX
  const st = paid ? ['Lunas', '#DDF1E4', '#0A5C2C', i >= 8 ? 'Dibayar hari ini' : 'Dibayar 5 ' + m.slice(0, 3) + ' 2026']
    : due ? ['Belum Bayar', '#FEEBDD', '#B4460F', 'Jatuh tempo 10 ' + m.slice(0, 3)]
      : ['Mendatang', '#F3ECE2', '#6B5848', 'Terbit 1 ' + m.slice(0, 3)]
  return { month: m + ' 2026', status: st[0], bg: st[1], fg: st[2], note: st[3] }
}).reverse())

function openPay() { if (outstanding.value) { state.pay = true; state.paid = false; state.payMonths = null } else flash('Tidak ada tagihan tertunggak') }
function closePay() { state.pay = false }
function goIpl() { go('ipl') }
function goKegiatan() { go('kegiatan') }

const sel = computed(() => state.payMonths || unpaid.value)
const payMonths = computed(() => unpaid.value.map(i => {
  const on = sel.value.includes(i)
  return { label: MONTHS[i], ...chip(on), toggle: () => { state.payMonths = on ? sel.value.filter(x => x !== i) : [...sel.value, i] } }
}))
const methods = computed(() => [
  ['va', 'Virtual Account BCA', 'account_balance', 'Konfirmasi otomatis'],
  ['qris', 'QRIS', 'qr_code_2', 'Semua e-wallet & m-banking'],
  ['tf', 'Transfer Bank', 'swap_horiz', 'Unggah bukti transfer']
].map(([k, l, i, sub]) => ({ label: l, icon: i, sub, bd: state.method === k ? '#A84503' : '#EFE6DA', dot: state.method === k ? '#A84503' : '#fff', pick: () => { state.method = k } })))
const payTotal = computed(() => sel.value.length * FEE)
const payTotalFmt = computed(() => rp(payTotal.value))
const payBtnBg = computed(() => payTotal.value ? '#A84503' : '#D9C7B2')
const payOpen = computed(() => state.pay)
const paySuccess = computed(() => state.paid)
const payForm = computed(() => !state.paid)
function confirmPay() {
  if (!payTotal.value) return
  let up = state.paidUpTo
  const sorted = [...sel.value].sort((a, b) => a - b)
  sorted.forEach(i => { if (i === up) up++ })
  state.paid = true
  state.paidUpTo = up
}

// warga data
const q = computed(() => state.q)
function setQ(e) { state.q = e.target.value }
const wargaFilters = computed(() => Object.keys(WARGA_FILTER_MAP).map(l => ({ label: l, ...chip(state.wf === l), pick: () => { state.wf = l } })))
const wargaList = computed(() => {
  const query = state.q.trim().toLowerCase()
  return state.residents.filter(r => (!WARGA_FILTER_MAP[state.wf] || r.status === WARGA_FILTER_MAP[state.wf]) && (!query || (r.koridor + ' ' + r.blok + ' ' + r.nama).toLowerCase().includes(query)))
    .map(r => ({
      id: r.id, blok: 'K' + (r.koridor || '—'), unit: 'Koridor ' + (r.koridor || '—') + ' No. ' + r.blok,
      nama: r.nama === '—' ? 'Belum berpenghuni' : r.nama,
      jml: r.jumlah ? r.jumlah + ' penghuni' : 'Tidak ada penghuni',
      phone: r.phone || '—',
      status: (ST[r.status] || ST.Kosong)[0], bg: (ST[r.status] || ST.Kosong)[1], fg: (ST[r.status] || ST.Kosong)[2],
      edit: () => openWargaForm(r),
      del: () => deleteWarga(r.id)
    }))
})
const wargaEmpty = computed(() => wargaList.value.length === 0)
const wargaStats = computed(() => [
  { label: 'Total Unit', value: state.residents.length, color: '#A84503' },
  { label: 'Dihuni Pemilik', value: state.residents.filter(r => r.status === 'Pemilik').length, color: '#0A7C3A' },
  { label: 'Kontrak/Sewa', value: state.residents.filter(r => r.status === 'Kontrak').length, color: '#4D74FF' },
  { label: 'Kosong', value: state.residents.filter(r => r.status === 'Kosong').length, color: '#B8A693' }
])

const KORIDOR_OPTS = [1, 2, 3, 4, 5]

function openWargaForm(r) {
  state.wargaForm = r
    ? { id: r.id, blok: r.blok, koridor: r.koridor || 1, nama: r.nama === '—' ? '' : r.nama, jumlah: r.jumlah || 0, status: r.status, phone: r.phone === '—' ? '' : (r.phone || '') }
    : { id: null, blok: '', koridor: 1, nama: '', jumlah: 0, status: 'Pemilik', phone: '' }
  state.wargaFormOpen = true
}
function addWarga() { openWargaForm(null) }
function closeWargaForm() { state.wargaFormOpen = false }
const wargaForm = computed(() => state.wargaForm)
function setWfBlok(e) { state.wargaForm = { ...state.wargaForm, blok: e.target.value } }
function setWfNama(e) { state.wargaForm = { ...state.wargaForm, nama: e.target.value } }
function setWfJumlah(e) { state.wargaForm = { ...state.wargaForm, jumlah: e.target.value } }
function setWfPhone(e) { state.wargaForm = { ...state.wargaForm, phone: e.target.value } }
const wfKoridorOpts = computed(() => KORIDOR_OPTS.map(k => ({
  label: 'Koridor ' + k, bd: state.wargaForm.koridor === k ? '#A84503' : '#EFE6DA',
  pick: () => { state.wargaForm = { ...state.wargaForm, koridor: k } }
})))
const wfStatusOpts = computed(() => Object.keys(ST).map(k => ({
  label: ST[k][0], bd: state.wargaForm.status === k ? '#A84503' : '#EFE6DA',
  pick: () => { state.wargaForm = { ...state.wargaForm, status: k } }
})))
const canSaveWarga = computed(() => !!state.wargaForm.blok.trim())
const wargaFormTitle = computed(() => state.wargaForm.id ? 'Ubah Data Warga' : 'Tambah Warga')
async function saveWargaForm() {
  if (!canSaveWarga.value) { flash('Lengkapi nomor blok rumah'); return }
  const f = state.wargaForm
  const data = { blok: f.blok.trim(), koridor: Number(f.koridor) || 1, nama: f.nama.trim() || '—', jumlah: Number(f.jumlah) || 0, status: f.status, phone: f.phone.trim() || '—' }
  try {
    if (f.id) await updateDoc(doc(db, 'residents', f.id), data)
    else await addDoc(collection(db, 'residents'), data)
    state.wargaFormOpen = false
    flash(f.id ? 'Data warga diperbarui' : 'Warga baru ditambahkan')
  } catch (e) {
    flash('Gagal menyimpan data warga')
  }
}
async function deleteWarga(id) {
  try {
    await deleteDoc(doc(db, 'residents', id))
    flash('Data warga dihapus')
  } catch (e) {
    flash('Gagal menghapus data warga')
  }
}

// kegiatan
const events = computed(() => EV.map(e => {
  const j = !!state.joined[e[0]]
  return {
    day: e[1], mon: e[2], title: e[3], time: e[4], place: e[5], cat: e[6], color: e[7], tint: e[8],
    btnLabel: isPublic.value ? 'Masuk untuk ikut' : j ? 'Terdaftar ✓' : 'Ikut Kegiatan',
    btnBg: j ? '#DDF1E4' : '#fff', btnFg: j ? '#0A5C2C' : '#2A1D14', btnBd: j ? '#DDF1E4' : '#EFE6DA',
    join: () => {
      if (isPublic.value) { state.screen = 'login'; state.redirect = 'kegiatan'; return }
      state.joined = { ...state.joined, [e[0]]: !j }
      if (!j) flash('Anda terdaftar di ' + e[3])
    }
  }
}))
const upcomingTop = computed(() => events.value.slice(0, 2))
const pastEvents = computed(() => PAST_EVENTS)

// piket
const todayIdx = 0
const shiftIdx = computed(() => { const h = new Date().getHours(); return h >= 6 && h < 14 ? 0 : h >= 14 && h < 22 ? 1 : 2 })
const piketCells = computed(() => {
  const cells = []
  PIKET_DAYS.forEach((d, i) => {
    const t = i === todayIdx
    cells.push({ text: d + (t ? ' · Hari ini' : ''), bg: t ? '#DDF1E4' : 'transparent', fg: t ? '#0A5C2C' : '#2A1D14', w: 700 })
    for (let k = 0; k < 3; k++) cells.push({ text: PIKET_CREW[i % 3][k], bg: t ? '#EEF8F1' : 'transparent', fg: '#2A1D14', w: t && k === shiftIdx.value ? 800 : 500 })
  })
  return cells
})
const onDuty = computed(() => ({ names: PIKET_CREW[todayIdx % 3][shiftIdx.value], shift: ['Pagi', 'Siang', 'Malam'][shiftIdx.value] }))

// announcements
function annView(a) {
  return {
    ...a,
    wargaOnly: a.aud === 'warga',
    audLabel: a.aud === 'warga' ? 'KHUSUS WARGA' : 'PUBLIK',
    audBg: a.aud === 'warga' ? '#F7EFE5' : '#E4EAFF',
    audFg: a.aud === 'warga' ? '#A84503' : '#22357A',
    del: () => { state.announcements = state.announcements.filter(x => x.id !== a.id); flash('Pengumuman dihapus') }
  }
}
const publicAnnouncements = computed(() => state.announcements.filter(a => a.aud === 'publik').map(annView))
const wargaAnnouncements = computed(() => state.announcements.map(annView))
const admAnnouncements = computed(() => state.announcements.map(annView))

// keluhan (warga)
function cView(c) { return { ...c, bg: CS[c.status][0], fg: CS[c.status][1] } }
const canSubmit = computed(() => !!(state.form.desc.trim() && state.form.lokasi.trim()))
const complaintCats = computed(() => ['Keamanan', 'Kebersihan', 'Fasilitas', 'Lingkungan', 'Lainnya'].map(l => ({ label: l, ...chip(state.form.cat === l), pick: () => { state.form = { ...state.form, cat: l } } })))
const form = computed(() => state.form)
function setLokasi(e) { state.form = { ...state.form, lokasi: e.target.value } }
function setDesc(e) { state.form = { ...state.form, desc: e.target.value } }
const submitBg = computed(() => canSubmit.value ? '#A84503' : '#D9C7B2')
function submitComplaint() {
  if (!canSubmit.value) { flash('Lengkapi lokasi dan deskripsi'); return }
  const c = { id: 'K-0' + (416 + state.complaints.length), cat: state.form.cat, date: '5 Okt', desc: state.form.desc, lokasi: state.form.lokasi, status: 'Diterima', reporter: user.value.name, mine: true }
  state.complaints = [c, ...state.complaints]
  state.form = { cat: state.form.cat, lokasi: '', desc: '' }
  flash('Laporan terkirim. Nomor ' + c.id)
}
const myComplaints = computed(() => state.complaints.filter(c => c.mine).map(cView))

// surat
const letters = computed(() => LETTERS.map(([t, m]) => ({ title: t, meta: m, dl: () => flash('Mengunduh ' + t + '…') })))

// aset
const asetFilters = computed(() => ['Semua', 'Gedung', 'Fasilitas', 'Peralatan'].map(l => ({ label: l, ...chip(state.af === l), pick: () => { state.af = l } })))
const asetList = computed(() => AS.filter(a => state.af === 'Semua' || a[3] === state.af).map(a => ({ nama: a[0], jml: a[1], lokasi: a[2], icon: a[4], kondisi: a[5], bg: a[5] === 'Baik' ? '#DDF1E4' : '#FEEBDD', fg: a[5] === 'Baik' ? '#0A5C2C' : '#B4460F' })))

// sosial
const sosialFilters = computed(() => ['Semua', 'Tukang', 'Sekolah', 'Kesehatan', 'Kuliner'].map(l => ({ label: l, ...chip(state.sf === l), pick: () => { state.sf = l } })))
const sosialList = computed(() => SO.filter(x => state.sf === 'Semua' || x[0] === state.sf).map(x => ({
  cat: x[0], nama: x[1], desc: x[2], rating: x[3], rec: x[4], contactIcon: isPublic.value ? 'lock' : 'chat',
  contact: () => { if (isPublic.value) { state.screen = 'login'; state.redirect = 'sosial' } else if (typeof window !== 'undefined') window.open('https://wa.me/6281200000000', '_blank') }
})))

// admin: dashboard
const paidUnitsCount = computed(() => 233 + UNITS.value.filter(u => u.status === 'Lunas').length)
const collected = computed(() => paidUnitsCount.value * FEE)
const target = computed(() => 320 * FEE)
const pct = computed(() => Math.round(collected.value / target.value * 100))
const admIpl = computed(() => ({ collectedFmt: rp(collected.value), targetFmt: rp(target.value), pct: pct.value, pctCss: pct.value + '%', paidUnits: paidUnitsCount.value }))
const admStats = computed(() => [
  { label: 'Menunggu verifikasi', value: pendingCount.value, icon: 'pending_actions', color: '#8A5A00', tint: '#FFF3D6', go: () => go('adm_ipl') },
  { label: 'Keluhan terbuka', value: openComplaints.value, icon: 'support_agent', color: '#C2410C', tint: '#FDE9DC', go: () => go('adm_keluhan') },
  { label: 'Unit dihuni', value: '292 / 320', icon: 'home', color: '#0A7C3A', tint: '#DDF1E4', go: () => go('adm_warga') }
])
function unitView(u) {
  const v = US[u.status]
  const act = u.status === 'Menunggu' ? ['Verifikasi', '#0A7C3A', '#fff', '#0A7C3A', () => { setUnit(u.unit, 'Lunas'); flash('Pembayaran ' + u.unit + ' diverifikasi') }]
    : u.status === 'Belum' ? ['Ingatkan', '#fff', '#2A1D14', '#EFE6DA', () => flash('Pengingat dikirim ke ' + u.nama)]
      : null
  return { ...u, status: v[0], bg: v[1], fg: v[2], note: v[3], bulan: 'Okt 2026', hasAct: !!act, actLabel: act ? act[0] : '', actBg: act ? act[1] : '', actFg: act ? act[2] : '', actBd: act ? act[3] : '', act: act ? act[4] : null }
}
function setUnit(unit, st) { state.units = { ...state.units, [unit]: st } }
const pendingUnits = computed(() => UNITS.value.filter(u => u.status === 'Menunggu').map(unitView))
const noPending = computed(() => pendingCount.value === 0)
const admComplaintsTop = computed(() => state.complaints.filter(c => c.status !== 'Selesai').slice(0, 3).map(cView))
function goAdmIpl() { go('adm_ipl') }
function goAdmKeluhan() { go('adm_keluhan') }
function goAdmInfo() { go('adm_info') }
function exportReport() { flash('Mengunduh laporan keuangan Oktober 2026…') }

// admin: ipl
const unitFilters = computed(() => Object.keys(UNIT_FILTER_MAP).map(l => ({ label: l, ...chip(state.uf === l), pick: () => { state.uf = l } })))
const unitList = computed(() => UNITS.value.filter(u => !UNIT_FILTER_MAP[state.uf] || u.status === UNIT_FILTER_MAP[state.uf]).map(unitView))
const unitCount = computed(() => unitList.value.length)
function remindAll() { flash('Pengingat dikirim ke ' + UNITS.value.filter(u => u.status === 'Belum').length + ' unit') }

// admin: keluhan
const cFilters = computed(() => ['Semua', 'Diterima', 'Diproses', 'Selesai'].map(l => ({ label: l, ...chip(state.cf === l), pick: () => { state.cf = l } })))
function setCStatus(id, st) { state.complaints = state.complaints.map(c => c.id === id ? { ...c, status: st } : c) }
const admComplaints = computed(() => state.complaints.filter(c => state.cf === 'Semua' || c.status === state.cf).map(c => {
  const next = c.status === 'Diterima' ? ['Mulai Proses', 'Diproses', '#3554D1'] : c.status === 'Diproses' ? ['Tandai Selesai', 'Selesai', '#0A7C3A'] : null
  return { ...cView(c), hasAct: !!next, actLabel: next ? next[0] : '', actBg: next ? next[2] : '', act: () => { if (next) { setCStatus(c.id, next[1]); flash('#' + c.id + ' → ' + next[1]) } } }
}))

// admin: pengumuman
const ann = computed(() => state.ann)
function setAnnTitle(e) { state.ann = { ...state.ann, title: e.target.value } }
function setAnnBody(e) { state.ann = { ...state.ann, body: e.target.value } }
const audOpts = computed(() => [['publik', 'Publik', 'public', 'Tampil di beranda umum'], ['warga', 'Khusus Warga', 'lock', 'Hanya setelah masuk']].map(([k, l, i, sub]) => ({ label: l, icon: i, sub, bd: state.ann.aud === k ? '#A84503' : '#EFE6DA', pick: () => { state.ann = { ...state.ann, aud: k } } })))
const canAnn = computed(() => !!(state.ann.title.trim() && state.ann.body.trim()))
const annBtnBg = computed(() => canAnn.value ? '#A84503' : '#D9C7B2')
function publishAnn() {
  if (!canAnn.value) { flash('Lengkapi judul dan isi'); return }
  state.announcements = [{ id: Date.now(), date: '5 Okt 2026', aud: state.ann.aud, title: state.ann.title, body: state.ann.body }, ...state.announcements]
  state.ann = { title: '', body: '', aud: state.ann.aud }
  flash('Pengumuman diterbitkan')
}

// misc
function notifyMe() { flash('Anda akan dikabari saat fitur CCTV tersedia') }
const showLogin = computed(() => state.screen === 'login')
const showApp = computed(() => state.screen !== 'login')
const toast = computed(() => state.toast)

// ───────────────────────── public API ─────────────────────────
export function usePortal() {
  return {
    state,
    // lifecycle
    initApp, teardownApp,
    // layout / role
    isDesktop, isCompact, wide, narrow, isPublic, isAdmin, isLogged, user, roleLabel,
    navGroups, services, bottomNav, pageTitle, crumb, greeting, is,
    showPublicHome, showWargaHome, showWargaData, isAdminWarga, showLogin, showApp,
    openLogin, backHome, logout, go, goKegiatan, goIpl,
    // login
    loginSub, loginTabs, setLoginId, setLoginPw, pwType, pwIcon, togglePw, loginBtn, fillDemo, doLogin,
    // drawer / notif / toast
    drawerOpen, openDrawer, closeDrawer, stop, notifOpen, toggleNotif, notifs, toast, contacts: CONTACTS,
    // ipl
    outstandingFmt, outstandingNote, iplStatus, paidYearFmt, paidCount, iplRows,
    openPay, closePay, payOpen, paySuccess, payForm, payMonths, methods, payTotalFmt, payBtnBg, confirmPay,
    // beranda
    upcomingTop, pastEvents: pastEvents, onDuty, publicAnnouncements, wargaAnnouncements, admAnnouncements,
    // warga
    wargaStats, q, setQ, wargaList, wargaEmpty, wargaFilters, addWarga,
    wargaForm, wargaFormOpen: computed(() => state.wargaFormOpen), wargaFormTitle, closeWargaForm,
    setWfBlok, setWfNama, setWfJumlah, setWfPhone, wfKoridorOpts, wfStatusOpts, canSaveWarga, saveWargaForm,
    // paguyuban
    pengurusInti: PENGURUS_INTI, pengurusBidang: PENGURUS_BIDANG,
    // kegiatan
    events,
    // piket
    shifts: SHIFTS, piketCells,
    // cctv
    cams: CAMS, notifyMe,
    // keluhan
    complaintCats, form, setLokasi, setDesc, submitBg, submitComplaint, myComplaints,
    // surat
    letters,
    // aset
    asetFilters, asetList,
    // sosial
    sosialFilters, sosialList,
    // admin dashboard
    admIpl, admStats, pendingUnits, noPending, admComplaintsTop, goAdmIpl, goAdmKeluhan, goAdmInfo, exportReport,
    // admin ipl
    unitFilters, unitList, unitCount, remindAll,
    // admin keluhan
    cFilters, admComplaints,
    // admin pengumuman
    ann, setAnnTitle, setAnnBody, audOpts, annBtnBg, publishAnn
  }
}
