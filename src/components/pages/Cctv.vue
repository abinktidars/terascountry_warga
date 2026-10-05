<script setup>
import { usePortal } from '../../composables/usePortal'

const { cams, notifyMe } = usePortal()
</script>

<template>
  <section class="cctv-wrap">
    <div class="cam-grid">
      <div v-for="(cam, ci) in cams" :key="ci" class="cam-tile">{{ cam }}</div>
    </div>
    <div class="overlay">
      <div class="overlay-card">
        <span class="overlay-icon icon">videocam</span>
        <span class="overlay-tag">SEGERA HADIR</span>
        <span class="overlay-title">Pantau CCTV Komplek</span>
        <span class="overlay-desc">Warga akan dapat melihat kamera di gerbang, jalan utama, dan fasilitas umum langsung dari portal.</span>
        <button class="overlay-btn" @click="notifyMe">Kabari Saya</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cctv-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #EFE6DA;
  background: #fff;
}
.cam-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 8px;
  padding: 8px;
  filter: blur(2px);
  opacity: 0.6;
}
.cam-tile {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: repeating-linear-gradient(135deg, #3A2C22 0 10px, #33261D 10px 20px);
  display: flex;
  align-items: flex-end;
  padding: 10px;
  color: #D9C7B2;
  font-family: ui-monospace, monospace;
  font-size: 11px;
}
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.overlay-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(42, 29, 20, 0.15);
}
.overlay-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #EFE8E0;
  color: #5B4A3E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.overlay-tag {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #A84503;
}
.overlay-title { font-size: 20px; font-weight: 800; }
.overlay-desc { font-size: 14px; color: #5E4B3C; line-height: 1.6; text-wrap: pretty; }
.overlay-btn {
  margin-top: 6px;
  padding: 12px 18px;
  border: 0;
  border-radius: 12px;
  background: #2A1D14;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
