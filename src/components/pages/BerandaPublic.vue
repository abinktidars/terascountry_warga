<script setup>
import { usePortal } from '../../composables/usePortal'

const { openLogin, goKegiatan, services, publicAnnouncements, upcomingTop, contacts } = usePortal()
</script>

<template>
  <section class="hero">
    <div class="hero-text">
      <span class="hero-tag">Portal Resmi Paguyuban Warga</span>
      <span class="hero-title">Selamat datang di Teras Country</span>
      <span class="hero-desc">Informasi kegiatan, pengurus paguyuban, fasilitas komplek, dan rekomendasi dari warga. Warga terdaftar dapat masuk untuk membayar IPL dan mengakses layanan lainnya.</span>
      <div class="hero-actions">
        <button class="btn-primary" @click="openLogin">Masuk Warga</button>
        <button class="btn-secondary" @click="goKegiatan">Lihat Kegiatan</button>
      </div>
    </div>
    <div class="hero-image">foto gerbang / suasana Teras Country</div>
  </section>

  <section class="services-section">
    <div class="services-head">
      <span class="section-title">Layanan</span>
      <span class="services-hint"><span class="icon">lock</span>Perlu masuk sebagai warga</span>
    </div>
    <div class="services-grid">
      <button v-for="(s, si) in services" :key="si" class="service-card" @click="s.go">
        <span v-if="s.locked" class="service-lock icon">lock</span>
        <span class="service-icon" :style="{ background: s.tint, color: s.color }">
          <span class="icon">{{ s.icon }}</span>
        </span>
        <span class="service-text">
          <span class="service-label">{{ s.label }}</span>
          <span class="service-sub">{{ s.sub }}</span>
        </span>
      </button>
    </div>
  </section>

  <section class="bottom-grid">
    <div class="card">
      <span class="section-title">Pengumuman</span>
      <div v-for="a in publicAnnouncements" :key="a.id" class="ann-item">
        <span class="ann-date">{{ a.date }}</span>
        <span class="ann-title">{{ a.title }}</span>
        <span class="ann-body">{{ a.body }}</span>
      </div>
    </div>
    <div class="side-col">
      <div class="card">
        <div class="card-head">
          <span class="section-title">Kegiatan Terdekat</span>
          <button class="link-btn" @click="goKegiatan">Lihat semua</button>
        </div>
        <div v-for="(e, ei) in upcomingTop" :key="ei" class="event-row">
          <div class="event-date" :style="{ background: e.tint, color: e.color }">
            <span class="event-day">{{ e.day }}</span>
            <span class="event-mon">{{ e.mon }}</span>
          </div>
          <div class="event-info">
            <span class="event-title">{{ e.title }}</span>
            <span class="event-meta">{{ e.time }} · {{ e.place }}</span>
          </div>
        </div>
      </div>
      <div class="card">
        <span class="section-title contact-title">Kontak Penting</span>
        <div v-for="(c, ci) in contacts" :key="ci" class="contact-row">
          <span class="contact-icon icon">{{ c.icon }}</span>
          <div class="contact-info">
            <span class="contact-label">{{ c.label }}</span>
            <span class="contact-sub">{{ c.sub }}</span>
          </div>
          <a href="tel:081200000000" class="contact-phone">{{ c.phone }}</a>
        </div>
      </div>
    </div>
  </section>

  <footer class="page-footer">
    <span>© 2026 Paguyuban Warga Teras Country</span>
    <span>Sekretariat: Balai Warga, Blok A</span>
  </footer>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 24px;
  overflow: hidden;
}
.hero-text {
  padding: clamp(24px, 4vw, 44px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
}
.hero-tag {
  align-self: flex-start;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  background: #F7EFE5;
  color: #A84503;
}
.hero-title {
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  text-wrap: pretty;
}
.hero-desc {
  font-size: 15px;
  color: #5E4B3C;
  line-height: 1.65;
  text-wrap: pretty;
}
.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn-primary {
  padding: 13px 20px;
  border: 0;
  border-radius: 12px;
  background: #A84503;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.btn-secondary {
  padding: 13px 20px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #fff;
  color: #2A1D14;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.hero-image {
  min-height: 260px;
  background: repeating-linear-gradient(135deg, #F3ECE2 0 12px, #EDE3D6 12px 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  color: #8A7563;
}

.services-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.services-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.section-title { font-size: 16px; font-weight: 800; }
.services-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #8A7563;
}
.services-hint .icon { font-size: 15px; }
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}
.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  color: #2A1D14;
}
.service-card:hover { border-color: #D9C7B2; }
.service-lock {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 16px;
  color: #B8A693;
}
.service-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-icon .icon { font-size: 22px; }
.service-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.service-label { font-size: 14px; font-weight: 700; }
.service-sub { font-size: 12px; color: #8A7563; }

.bottom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 16px;
}
.card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ann-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
}
.ann-date { font-size: 12px; color: #8A7563; }
.ann-title { font-size: 14px; font-weight: 700; text-wrap: pretty; }
.ann-body { font-size: 13px; color: #5E4B3C; text-wrap: pretty; line-height: 1.5; }
.side-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link-btn {
  border: 0;
  background: none;
  color: #A84503;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.event-row {
  display: flex;
  gap: 14px;
  align-items: center;
}
.event-date {
  width: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  line-height: 1.1;
}
.event-day { font-size: 18px; font-weight: 800; }
.event-mon { font-size: 11px; font-weight: 700; }
.event-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.event-title { font-size: 14px; font-weight: 700; }
.event-meta { font-size: 12px; color: #8A7563; }
.contact-title { padding-bottom: 8px; }
.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid #F3ECE2;
}
.contact-icon { font-size: 20px; color: #A84503; }
.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.contact-label { font-size: 14px; font-weight: 700; }
.contact-sub { font-size: 12px; color: #8A7563; }
.contact-phone { font-size: 13px; font-weight: 700; }

.page-footer {
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #8A7563;
}
</style>
