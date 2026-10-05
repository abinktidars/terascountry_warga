<script setup>
import { usePortal } from '../../composables/usePortal'

const { shifts, piketCells } = usePortal()
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

  <section class="schedule-card">
    <div class="schedule-head">
      <span class="section-title">Jadwal Minggu Ini</span>
      <span class="schedule-range">29 Sep – 5 Okt 2026</span>
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
  gap: 12px;
}
.shift-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
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
</style>
