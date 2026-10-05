<script setup>
import { usePortal } from '../../composables/usePortal'
import logoTc from '../../assets/logo-tc.png'

const { pengurusInti, pengurusBidang } = usePortal()

const ketuaKoridor = [1, 2, 3, 4, 5].map(n => ({ ini: 'K' + n, nama: '—', jabatan: 'Ketua Koridor ' + n, blok: '', color: '#A84503', tint: '#F7EFE5' }))
</script>

<template>
  <section class="intro-card">
    <img :src="logoTc" alt="Teras Country Warga" class="intro-logo" />
    <div class="intro-text">
      <span class="intro-title">Paguyuban Warga Teras Country</span>
      <span class="intro-desc">Wadah warga untuk mengelola keamanan, kebersihan, fasilitas, dan kegiatan sosial di lingkungan perumahan. Periode kepengurusan 2025–2028.</span>
    </div>
  </section>

  <section class="section">
    <span class="section-title">Pengurus Inti</span>
    <div class="inti-grid">
      <div v-for="(p, pi) in pengurusInti" :key="pi" class="inti-card">
        <div class="inti-avatar" :style="{ background: p.tint, color: p.color }">{{ p.ini }}</div>
        <div class="inti-text">
          <span class="inti-nama">{{ p.nama }}</span>
          <span class="inti-jabatan" :style="{ color: p.color }">{{ p.jabatan }}</span>
          <span class="inti-blok">{{ p.blok }}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <span class="section-title">Ketua Koridor</span>
    <div class="inti-grid">
      <div v-for="(k, ki) in ketuaKoridor" :key="ki" class="inti-card">
        <div class="inti-avatar" :style="{ background: k.tint, color: k.color }">{{ k.ini }}</div>
        <div class="inti-text">
          <span class="inti-nama">{{ k.nama }}</span>
          <span class="inti-jabatan" :style="{ color: k.color }">{{ k.jabatan }}</span>
          <span v-if="k.blok" class="inti-blok">{{ k.blok }}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <span class="section-title">Koordinator Bidang & RT</span>
    <div class="bidang-card">
      <div v-for="(b, bi) in pengurusBidang" :key="bi" class="bidang-row">
        <span class="bidang-label">{{ b.bidang }}</span>
        <span class="bidang-nama">{{ b.nama }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}
.intro-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.intro-text {
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.intro-title { font-size: 20px; font-weight: 800; }
.intro-desc { font-size: 14px; color: #5E4B3C; line-height: 1.6; text-wrap: pretty; }

.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.section-title { font-size: 16px; font-weight: 800; }
.inti-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: 12px;
}
.inti-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.inti-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
}
.inti-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.inti-nama { font-size: 15px; font-weight: 700; }
.inti-jabatan { font-size: 12px; font-weight: 700; }
.inti-blok { font-size: 12px; color: #8A7563; }

.bidang-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 4px 20px;
}
.bidang-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid #F3ECE2;
  flex-wrap: wrap;
}
.bidang-label {
  flex: 1;
  min-width: 160px;
  font-size: 14px;
  color: #5E4B3C;
}
.bidang-nama { font-size: 14px; font-weight: 700; }
</style>
