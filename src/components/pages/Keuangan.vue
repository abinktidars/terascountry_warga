<script setup>
import { ref, computed } from 'vue'

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober']
const UNITS_TOTAL = 320

// [kategori, ikon, warna, tint, nominal per bulan Jan–Okt (rupiah)]  — data contoh, ganti dengan data asli bendahara
const fixed = n => Array(10).fill(n)
const POS = [
  ['Gaji Security', 'shield_person', '#0A7C3A', '#DDF1E4', fixed(24000000)],
  ['Kebersihan & Pengangkutan Sampah', 'cleaning_services', '#3554D1', '#E4EAFF', fixed(14000000)],
  ['Listrik & Air Fasilitas Umum', 'bolt', '#B8325F', '#FDE6EE', [6200000, 6400000, 6300000, 6600000, 6800000, 6500000, 6700000, 6900000, 6600000, 6500000]],
  ['Perawatan Taman & Lingkungan', 'park', '#7048D6', '#EEE8FD', fixed(5500000)],
  ['Pemeliharaan Fasilitas', 'build', '#C2410C', '#FDE9DC', [3000000, 7500000, 2000000, 4500000, 9000000, 2500000, 3500000, 6000000, 2800000, 4200000]],
  ['Kegiatan Warga & Sosial', 'diversity_3', '#A84503', '#F7EFE5', [1500000, 2000000, 4500000, 1500000, 2500000, 1500000, 6000000, 2000000, 1500000, 3000000]],
  ['Operasional Sekretariat', 'apartment', '#5B4A3E', '#EFE8E0', fixed(3000000)],
  ['Dana Cadangan', 'savings', '#0A7C3A', '#DDF1E4', fixed(8000000)]
]
// unit yang membayar IPL tiap bulan (contoh)
const PAID = [296, 294, 293, 295, 291, 292, 290, 293, 292, 288]
const FEE = 250000

const rp = n => 'Rp ' + n.toLocaleString('id-ID')

const idx = ref(9)
const months = computed(() => MONTHS.map((m, i) => ({
  label: m.slice(0, 3),
  on: i === idx.value,
  pick: () => { idx.value = i }
})))

const income = computed(() => PAID[idx.value] * FEE)
const rows = computed(() => {
  const total = POS.reduce((s, p) => s + p[4][idx.value], 0)
  return POS.map(p => {
    const v = p[4][idx.value]
    return { nama: p[0], icon: p[1], color: p[2], tint: p[3], value: rp(v), pct: Math.round(v / total * 100), width: (v / total * 100).toFixed(1) + '%' }
  })
})
const spend = computed(() => POS.reduce((s, p) => s + p[4][idx.value], 0))
const balance = computed(() => income.value - spend.value)
const summary = computed(() => [
  { label: 'Pemasukan IPL', value: rp(income.value), sub: PAID[idx.value] + ' dari ' + UNITS_TOTAL + ' unit', color: '#0A7C3A' },
  { label: 'Total Pengeluaran', value: rp(spend.value), sub: 'Alokasi ' + MONTHS[idx.value] + ' 2026', color: '#C2410C' },
  { label: balance.value >= 0 ? 'Surplus' : 'Defisit', value: rp(Math.abs(balance.value)), sub: balance.value >= 0 ? 'Masuk saldo kas' : 'Ditutup dari saldo kas', color: balance.value >= 0 ? '#3554D1' : '#B4460F' }
])
</script>

<template>
  <section class="months">
    <button v-for="(m, i) in months" :key="i" class="month-chip" :class="{ on: m.on }" @click="m.pick">{{ m.label }}</button>
  </section>

  <section class="summary">
    <div v-for="(s, i) in summary" :key="i" class="sum-card">
      <span class="sum-label">{{ s.label }}</span>
      <span class="sum-value" :style="{ color: s.color }">{{ s.value }}</span>
      <span class="sum-sub">{{ s.sub }}</span>
    </div>
  </section>

  <section class="panel">
    <div class="panel-head">
      <span class="panel-title">Alokasi dana keluar · {{ MONTHS[idx] }} 2026</span>
    </div>
    <div v-for="(r, i) in rows" :key="i" class="row">
      <span class="row-icon icon" :style="{ background: r.tint, color: r.color }">{{ r.icon }}</span>
      <div class="row-body">
        <div class="row-top">
          <span class="row-name">{{ r.nama }}</span>
          <span class="row-value">{{ r.value }}</span>
        </div>
        <div class="bar"><div class="bar-fill" :style="{ width: r.width, background: r.color }"></div></div>
        <span class="row-pct">{{ r.pct }}% dari total pengeluaran</span>
      </div>
    </div>
  </section>

  <p class="note">Data contoh. Angka resmi disusun bendahara paguyuban dan dapat diminta di sekretariat.</p>
</template>

<style scoped>
.months { display: flex; gap: 6px; flex-wrap: wrap; }
.month-chip {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #EFE6DA;
  background: #fff;
  color: #5E4B3C;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.month-chip.on { background: #2A1D14; border-color: #2A1D14; color: #fff; }
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 12px;
}
.sum-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sum-label { font-size: 12px; font-weight: 600; color: #8A7563; }
.sum-value { font-size: 22px; font-weight: 800; }
.sum-sub { font-size: 12px; color: #8A7563; }
.panel {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.panel-title { font-size: 15px; font-weight: 700; }
.row { display: flex; gap: 12px; align-items: flex-start; }
.row-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.row-top { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.row-name { font-size: 14px; font-weight: 600; }
.row-value { font-size: 14px; font-weight: 700; }
.bar { height: 8px; border-radius: 999px; background: #F3ECE2; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 999px; }
.row-pct { font-size: 12px; color: #8A7563; }
.note { font-size: 12px; color: #8A7563; margin: 0; }
</style>
