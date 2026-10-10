<script setup>
import { ref } from 'vue'
import { usePortal } from '../../composables/usePortal'
import securityPhotoPlaceholder from '../../assets/security-photo-placeholder.svg'

const { shifts, piketCells, piketRange, securityGuards, piketPhoneDigits } = usePortal()
const securityCarousel = ref(null)

function scrollSecurityCarousel(direction) {
  const carousel = securityCarousel.value
  const card = carousel?.querySelector('.security-card')
  if (!carousel || !card) return

  const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0
  carousel.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="shift-grid">
    <div v-for="(s, si) in shifts" :key="si" class="shift-card">
      <span class="shift-icon" :style="{ background: s.tint, color: s.color }">
        <span class="icon">{{ s.icon }}</span>
      </span>
      <div class="shift-text">
        <span class="shift-name">Shift {{ s.name }}</span>
        <span class="shift-hours">{{ s.hours }}</span>
      </div>
    </div>
  </section>

  <section class="security-section">
    <div class="security-header">
      <span class="section-title">Kontak Satpam</span>
      <div class="carousel-controls">
        <button class="carousel-btn icon" aria-label="Satpam sebelumnya" @click="scrollSecurityCarousel(-1)">chevron_left</button>
        <button class="carousel-btn icon" aria-label="Satpam berikutnya" @click="scrollSecurityCarousel(1)">chevron_right</button>
      </div>
    </div>
    <div ref="securityCarousel" class="security-grid">
      <article v-for="guard in securityGuards" :key="guard.id" class="security-card">
        <img
          :src="securityPhotoPlaceholder"
          :alt="`Foto ${guard.name} (placeholder)`"
          class="security-photo"
        />
        <span class="security-name">{{ guard.name }}</span>
        <span class="security-phone">{{ guard.phone || '+62 8xx-xxxx-xxxx' }}</span>
        <div class="security-actions">
          <a
            v-if="piketPhoneDigits(guard.phone)"
            class="contact-btn whatsapp-btn"
            :href="`https://wa.me/${piketPhoneDigits(guard.phone)}`"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`WhatsApp ${guard.name}`"
          >
            <span class="icon">chat</span>
            WhatsApp
          </a>
          <button v-else class="contact-btn whatsapp-btn" type="button" disabled aria-label="Nomor WhatsApp belum tersedia">
            <span class="icon">chat</span>
            WhatsApp
          </button>
          <a
            v-if="piketPhoneDigits(guard.phone)"
            class="contact-btn phone-btn"
            :href="`tel:+${piketPhoneDigits(guard.phone)}`"
            :aria-label="`Telepon ${guard.name}`"
          >
            <span class="icon">call</span>
            Telepon
          </a>
          <button v-else class="contact-btn phone-btn" type="button" disabled aria-label="Nomor telepon belum tersedia">
            <span class="icon">call</span>
            Telepon
          </button>
        </div>
      </article>
    </div>
  </section>

  <section class="schedule-card">
    <div class="schedule-head">
      <span class="section-title">Jadwal Minggu Ini</span>
      <span class="schedule-range">{{ piketRange }}</span>
    </div>
    <div class="schedule-scroll">
      <div class="schedule-grid">
        <div class="schedule-th">Hari</div>
        <div class="schedule-th">Pagi</div>
        <div class="schedule-th">Siang</div>
        <div class="schedule-th">Malam</div>
        <div v-for="(c, ci) in piketCells" :key="ci" class="schedule-cell" :style="{ background: c.bg, color: c.fg, fontWeight: c.w }">{{ c.text }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shift-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 8px;
}
.shift-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  gap: 12px;
  align-items: center;
}
.shift-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shift-icon .icon { font-size: 22px; }
.shift-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.shift-name { font-size: 14px; font-weight: 700; }
.shift-hours { font-size: 12px; color: #8A7563; }

.security-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.section-title { font-size: 16px; font-weight: 800; }
.security-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.carousel-controls { display: flex; gap: 8px; }
.carousel-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #EFE6DA;
  border-radius: 10px;
  background: #fff;
  color: #5E4B3C;
  font-size: 20px;
  cursor: pointer;
}
.carousel-btn:hover { background: #F7EFE5; }
.security-grid {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 4px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.security-card {
  flex: 0 0 180px;
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  scroll-snap-align: start;
}
.security-photo {
  width: 76px;
  height: 76px;
  border-radius: 50%;
}
.security-name { font-size: 15px; font-weight: 700; }
.security-phone { font-size: 13px; color: #8A7563; }
.security-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}
.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 28px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 9px;
  text-decoration: none;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: not-allowed;
}
.contact-btn:disabled { opacity: 0.55; }
.whatsapp-btn { background: #DDF1E4; color: #0A5C2C; }
.phone-btn { border-color: #EFE6DA; background: #fff; color: #5E4B3C; }

.schedule-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.schedule-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.section-title { font-size: 16px; font-weight: 800; }
.schedule-range { font-size: 13px; color: #8A7563; }
.schedule-scroll { overflow-x: auto; }
.schedule-grid {
  min-width: 560px;
  display: grid;
  grid-template-columns: 110px repeat(3, minmax(0, 1fr));
  font-size: 13px;
}
.schedule-th {
  padding: 10px 8px;
  font-weight: 700;
  color: #8A7563;
  border-bottom: 1px solid #EFE6DA;
}
.schedule-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3ECE2;
}

@media (max-width: 700px) {
  .security-grid { gap: 6px; }
  .security-card {
    flex: 0 0 130px;
    padding: 8px;
  }
  .security-photo {
    width: 60px;
    height: 60px;
  }
}
</style>
