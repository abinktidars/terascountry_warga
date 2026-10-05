<script setup>
import { usePortal } from '../../composables/usePortal'

const {
  admIpl, admStats, pendingUnits, noPending, admComplaintsTop,
  goAdmIpl, goAdmKeluhan, goAdmInfo, addWarga, exportReport
} = usePortal()
</script>

<template>
  <section class="top-grid">
    <div class="hero-card">
      <div class="hero-head">
        <div class="hero-text">
          <span class="hero-label">Penerimaan IPL Oktober 2026</span>
          <span class="hero-value">{{ admIpl.collectedFmt }}</span>
        </div>
        <span class="hero-target">dari target {{ admIpl.targetFmt }} · {{ admIpl.pct }}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: admIpl.pctCss }"></div>
      </div>
      <span class="hero-foot">{{ admIpl.paidUnits }} dari 320 unit sudah membayar</span>
    </div>
    <button v-for="(st, si) in admStats" :key="si" class="stat-card" @click="st.go">
      <span class="stat-icon" :style="{ background: st.tint, color: st.color }">
        <span class="icon">{{ st.icon }}</span>
      </span>
      <span class="stat-text">
        <span class="stat-value">{{ st.value }}</span>
        <span class="stat-label">{{ st.label }}</span>
      </span>
    </button>
  </section>

  <section class="mid-grid">
    <div class="list-card">
      <div class="list-head">
        <span class="section-title">Menunggu Verifikasi</span>
        <button class="link-btn" @click="goAdmIpl">Semua</button>
      </div>
      <div v-for="(u, ui) in pendingUnits" :key="ui" class="unit-row">
        <div class="unit-info">
          <span class="unit-nama">{{ u.nama }}</span>
          <span class="unit-sub">{{ u.unit }} · {{ u.bulan }} · Transfer</span>
        </div>
        <button class="verify-btn" @click="u.act">Verifikasi</button>
      </div>
      <div v-if="noPending" class="empty">Tidak ada pembayaran yang menunggu.</div>
    </div>
    <div class="list-card">
      <div class="list-head">
        <span class="section-title">Keluhan Terbaru</span>
        <button class="link-btn" @click="goAdmKeluhan">Semua</button>
      </div>
      <div v-for="c in admComplaintsTop" :key="c.id" class="complaint-row">
        <div class="complaint-head">
          <span class="complaint-meta">#{{ c.id }} · {{ c.reporter }}</span>
          <span class="complaint-status" :style="{ background: c.bg, color: c.fg }">{{ c.status }}</span>
        </div>
        <span class="complaint-desc">{{ c.desc }}</span>
      </div>
    </div>
  </section>

  <section class="actions-row">
    <button class="action-btn" @click="goAdmInfo"><span class="icon action-icon">campaign</span>Buat Pengumuman</button>
    <button class="action-btn" @click="addWarga"><span class="icon action-icon">person_add</span>Tambah Warga</button>
    <button class="action-btn" @click="exportReport"><span class="icon action-icon">download</span>Laporan Keuangan</button>
  </section>
</template>

<style scoped>
.top-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 12px;
}
.hero-card {
  grid-column: 1 / -1;
  background: #2A1D14;
  color: #fff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.hero-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.hero-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hero-label { font-size: 13px; opacity: 0.75; }
.hero-value { font-size: clamp(26px, 3vw, 34px); font-weight: 800; letter-spacing: -0.02em; }
.hero-target { font-size: 14px; opacity: 0.85; }
.progress-track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #F7702E;
}
.hero-foot { font-size: 12px; opacity: 0.75; }

.stat-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  text-align: left;
  color: #2A1D14;
}
.stat-card:hover { border-color: #D9C7B2; }
.stat-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-icon .icon { font-size: 22px; }
.stat-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-value { font-size: 22px; font-weight: 800; }
.stat-label { font-size: 12px; color: #8A7563; }

.mid-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  gap: 16px;
  align-items: start;
}
.list-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 8px 20px 12px;
}
.list-head {
  padding: 14px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title { font-size: 16px; font-weight: 800; }
.link-btn {
  border: 0;
  background: none;
  color: #A84503;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.unit-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
  flex-wrap: wrap;
}
.unit-info {
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.unit-nama { font-size: 14px; font-weight: 700; }
.unit-sub { font-size: 12px; color: #8A7563; }
.verify-btn {
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  background: #0A7C3A;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.empty {
  padding: 20px 0;
  border-top: 1px solid #F3ECE2;
  font-size: 13px;
  color: #8A7563;
}
.complaint-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
}
.complaint-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.complaint-meta { font-size: 12px; color: #8A7563; }
.complaint-status {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.complaint-desc { font-size: 14px; font-weight: 600; text-wrap: pretty; }

.actions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #fff;
  color: #2A1D14;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.action-icon { font-size: 20px; color: #A84503; }
</style>
