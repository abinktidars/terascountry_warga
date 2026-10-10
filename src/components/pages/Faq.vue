<script setup>
// Draf isi FAQ — sesuaikan dengan keputusan resmi pengurus paguyuban
const GROUPS = [
  {
    title: 'Tentang Paguyuban', icon: 'account_tree', color: '#7048D6', tint: '#EEE8FD',
    items: [
      ['Apa itu paguyuban?', 'Paguyuban adalah wadah warga Teras Country untuk mengelola kepentingan bersama: keamanan, kebersihan, fasilitas umum, kegiatan sosial, dan komunikasi antarwarga. Pengurus dipilih dari dan oleh warga, lalu mengelola iuran secara transparan.'],
      ['Siapa saja pengurusnya?', 'Struktur terdiri dari Ketua, Wakil Ketua, Sekretaris, Bendahara, Ketua Koridor, dan Koordinator Bidang. Daftar lengkapnya ada di menu Paguyuban.'],
      ['Bagaimana menghubungi pengurus?', 'Datang ke sekretariat di Balai Warga (09.00–16.00), hubungi nomor sekretariat, atau sampaikan lewat menu Lapor Keluhan.']
    ]
  },
  {
    title: 'Iuran Pengelolaan Lingkungan (IPL)', icon: 'payments', color: '#D45A1A', tint: '#FEEBDD',
    items: [
      ['Apa itu IPL?', 'IPL adalah iuran bulanan warga untuk membiayai keamanan, kebersihan, listrik dan air fasilitas umum, perawatan taman, serta pemeliharaan fasilitas komplek. Rincian pemakaiannya bisa dilihat di menu Laporan Keuangan.'],
      ['Berapa besar IPL?', 'Rp 75.000 per unit setiap bulan.'],
      ['Kapan tagihan terbit dan jatuh tempo?', 'Tagihan terbit setiap tanggal 1 dan jatuh tempo setiap tanggal 10 pada bulan yang sama.'],
      ['Bagaimana cara membayar?', 'Melalui menu Pembayaran IPL dengan Virtual Account BCA, QRIS, atau transfer bank (unggah bukti transfer). Pembayaran transfer akan diverifikasi pengurus.'],
      ['Bagaimana jika terlambat membayar?', 'Tagihan tetap tercatat sebagai tunggakan dan terakumulasi tiap bulan. Hubungi bendahara bila ada kendala agar dicarikan solusi.']
    ]
  },
  {
    title: 'Tata Tertib Lingkungan', icon: 'gavel', color: '#0A7C3A', tint: '#DDF1E4',
    items: [
      ['Apa jam operasional gerbang?', 'Gerbang utama dibuka 24 jam. Gerbang belakang dibuka pukul 05.00–22.00; di luar jam tersebut gunakan gerbang utama.'],
      ['Bagaimana aturan untuk tamu?', 'Tamu wajib lapor dan menitipkan identitas di pos security. Warga bertanggung jawab atas tamu yang diundang, termasuk kendaraannya.'],
      ['Apa aturan kebisingan?', 'Hindari kebisingan setelah pukul 22.00. Acara besar di rumah wajib diberitahukan ke pengurus minimal 3 hari sebelumnya.'],
      ['Bagaimana aturan sampah?', 'Buang sampah pada tempatnya dan sesuai jadwal pengangkutan. Dilarang membuang sampah di selokan, taman, atau lahan kosong.'],
      ['Bagaimana aturan parkir?', 'Parkir di dalam pagar rumah atau area yang ditentukan. Jangan menutup akses jalan, hidran, dan garasi warga lain.'],
      ['Apakah renovasi perlu izin?', 'Ya. Ajukan ke pengurus sebelum memulai, termasuk jam kerja, jalur material, dan kebersihan jalan selama pengerjaan.'],
      ['Bagaimana aturan hewan peliharaan?', 'Hewan peliharaan harus dijaga agar tidak mengganggu warga. Pemilik wajib membersihkan kotoran dan menjaga hewan tetap terkendali di area umum.'],
      ['Apakah ada kerja bakti?', 'Ya, kerja bakti bulanan dilaksanakan hari Minggu. Jadwalnya diumumkan di menu Kegiatan dan Pengumuman.']
    ]
  }
]
</script>

<template>
  <section v-for="(g, gi) in GROUPS" :key="gi" class="group">
    <div class="group-head">
      <span class="group-icon icon" :style="{ background: g.tint, color: g.color }">{{ g.icon }}</span>
      <span class="group-title">{{ g.title }}</span>
    </div>
    <div class="list">
      <details v-for="(q, qi) in g.items" :key="qi" class="item">
        <summary class="q">
          <span>{{ q[0] }}</span>
          <span class="icon chev">expand_more</span>
        </summary>
        <p class="a">{{ q[1] }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.group { display: flex; flex-direction: column; gap: 10px; }
.group-head { display: flex; align-items: center; gap: 10px; }
.group-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.group-title { font-size: 16px; font-weight: 700; }
.list { display: flex; flex-direction: column; gap: 8px; }
.item { background: #fff; border: 1px solid #EFE6DA; border-radius: 14px; }
.q {
  list-style: none;
  cursor: pointer;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
}
.q::-webkit-details-marker { display: none; }
.chev { color: #8A7563; transition: transform 0.15s; }
.item[open] .chev { transform: rotate(180deg); }
.a { margin: 0; padding: 0 16px 16px; font-size: 14px; line-height: 1.6; color: #5E4B3C; }
</style>
