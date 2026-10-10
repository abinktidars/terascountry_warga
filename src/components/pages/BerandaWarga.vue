<script setup>
import { usePortal } from '../../composables/usePortal'

const {
  greeting, user, iplStatus, outstandingFmt, outstandingNote, openPay, goIpl,
  services, wargaAnnouncements, goKegiatan, upcomingTop, onDuty
} = usePortal()
</script>

<template>
  <section class="top-grid">
    <div class="welcome-card">
      <div class="welcome-circle"></div>
      <div class="welcome-text">
        <span class="greeting">{{ greeting }},</span>
        <span class="full-name">{{ user.full }}</span>
        <span class="unit">{{ user.unit }}</span>
      </div>
      <div class="welcome-tags">
        <span class="welcome-tag">Pemilik · Dihuni</span>
        <span class="welcome-tag">4 Penghuni</span>
      </div>
    </div>
  </section>

  <section class="services-section">
    <span class="section-title">Layanan</span>
    <div class="services-grid">
      <button v-for="(s, si) in services" :key="si" class="service-card" @click="s.go">
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
      <div v-for="a in wargaAnnouncements" :key="a.id" class="ann-item">
        <div class="ann-date-row">
          <span class="ann-date">{{ a.date }}</span>
          <span v-if="a.wargaOnly" class="ann-badge">KHUSUS WARGA</span>
        </div>
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
      <div class="duty-card">
        <div class="duty-head">
          <span class="icon">shield_person</span>
          <span class="duty-title">Security Bertugas Sekarang</span>
        </div>
        <div class="duty-row">
          <div class="duty-info">
            <span class="duty-names">{{ onDuty.names }}</span>
            <span class="duty-shift">Shift {{ onDuty.shift }} · Pos Gerbang Utama</span>
          </div>
          <a href="tel:081200000000" class="duty-call">
            <span class="icon">call</span>Hubungi Pos
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.top-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 16px;
}
.welcome-card {
  background: #A84503;
  color: #fff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
}
.welcome-circle {
  position: absolute;
  right: -40px;
  top: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 18px solid rgba(255, 255, 255, 0.08);
}
.welcome-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.greeting { font-size: 14px; opacity: 0.85; }
.full-name { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.unit { font-size: 14px; opacity: 0.85; }
.welcome-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.welcome-tag {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
}
.ipl-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ipl-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.ipl-label { font-size: 14px; font-weight: 700; }
.ipl-status {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
}
.ipl-amount-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ipl-amount { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
.ipl-note { font-size: 13px; color: #8A7563; }
.ipl-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
}
.btn-dark {
  flex: 1;
  min-width: 140px;
  padding: 12px 16px;
  border: 0;
  border-radius: 12px;
  background: #2A1D14;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.btn-dark:hover { background: #46331F; }
.btn-outline {
  padding: 12px 16px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #fff;
  color: #2A1D14;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.services-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.section-title { font-size: 16px; font-weight: 800; }
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.service-card {
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
.ann-date-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.ann-date { font-size: 12px; color: #8A7563; }
.ann-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 6px;
  background: #F7EFE5;
  color: #A84503;
}
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

.duty-card {
  background: #DDF1E4;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.duty-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0A5C2C;
}
.duty-head .icon { font-size: 20px; }
.duty-title { font-size: 14px; font-weight: 800; }
.duty-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.duty-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.duty-names { font-size: 16px; font-weight: 800; color: #0A3D1E; }
.duty-shift { font-size: 12px; color: #22603A; }
.duty-call {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #0A7C3A;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}
.duty-call .icon { font-size: 18px; }
</style>
