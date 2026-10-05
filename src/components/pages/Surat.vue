<script setup>
import { usePortal } from '../../composables/usePortal'

const { letters } = usePortal()
</script>

<template>
  <section class="info-banner">
    <span class="icon">info</span>
    <span>Unduh format surat, isi data, lalu minta tanda tangan Ketua RT/RW. Surat yang sudah lengkap bisa diserahkan ke sekretariat di Balai Warga.</span>
  </section>

  <section class="letters-grid">
    <div v-for="(l, li) in letters" :key="li" class="letter-card">
      <span class="letter-icon icon">description</span>
      <div class="letter-info">
        <span class="letter-title">{{ l.title }}</span>
        <span class="letter-meta">{{ l.meta }}</span>
      </div>
      <button class="dl-btn icon" aria-label="Unduh" @click="l.dl">download</button>
    </div>
  </section>
</template>

<style scoped>
.info-banner {
  background: #E4EAFF;
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: #22357A;
}
.info-banner .icon { font-size: 20px; }
.info-banner span:last-child { font-size: 13px; line-height: 1.6; text-wrap: pretty; }

.letters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 12px;
}
.letter-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: center;
}
.letter-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #E4EAFF;
  color: #3554D1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.letter-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.letter-title { font-size: 14px; font-weight: 700; }
.letter-meta { font-size: 12px; color: #8A7563; }
.dl-btn {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #EFE6DA;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2A1D14;
  font-size: 20px;
}
.dl-btn:hover { background: #F7EFE5; }
</style>
