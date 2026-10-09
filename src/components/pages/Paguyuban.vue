<script setup>
import { usePortal } from '../../composables/usePortal'
import logoTc from '../../assets/logo-tc.png'

const { pengurusInti, ketuaKoridor, pengurusBidang } = usePortal()
</script>

<template>
  <section class="intro-card">
    <img :src="logoTc" alt="Teras Country Warga" class="intro-logo" />
    <div class="intro-text">
      <span class="intro-title">Struktur Paguyuban Teras Country Tahun 2026-2029 </span>
      <span class="intro-desc">Wadah warga untuk mengelola keamanan, kebersihan, fasilitas, dan kegiatan sosial di lingkungan perumahan.</span>
    </div>
  </section>

  <section class="section">
    <span class="section-title">Struktur Kepengurusan</span>
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
    <span class="section-title">Koordinator Bidang</span>
    <div class="inti-grid">
      <div v-for="(b, bi) in pengurusBidang" :key="bi" class="inti-card">
        <div class="inti-avatar" :style="{ background: b.tint, color: b.color }">{{ b.ini }}</div>
        <div class="inti-text">
          <span class="inti-nama">{{ b.nama }}</span>
          <span class="inti-jabatan" :style="{ color: b.color }">{{ b.jabatan }}</span>
          <span v-if="b.blok" class="inti-blok">{{ b.blok }}</span>
        </div>
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
</style>
