<script setup>
import { usePortal } from '../../composables/usePortal'

const { events, pastEvents } = usePortal()
</script>

<template>
  <section class="section">
    <span class="section-title">Akan Datang</span>
    <div class="events-grid">
      <div v-for="(e, ei) in events" :key="ei" class="event-card">
        <div class="event-top">
          <div class="event-date" :style="{ background: e.tint, color: e.color }">
            <span class="event-day">{{ e.day }}</span>
            <span class="event-mon">{{ e.mon }}</span>
          </div>
          <div class="event-info">
            <span class="event-cat" :style="{ color: e.color }">{{ e.cat }}</span>
            <span class="event-title">{{ e.title }}</span>
            <span class="event-meta">{{ e.time }} · {{ e.place }}</span>
          </div>
        </div>
        <button class="event-btn" :style="{ borderColor: e.btnBd, background: e.btnBg, color: e.btnFg }" @click="e.join">{{ e.btnLabel }}</button>
      </div>
    </div>
  </section>

  <section class="section">
    <span class="section-title">Telah Berlangsung</span>
    <div class="past-grid">
      <div v-for="(e, ei) in pastEvents" :key="ei" class="past-card">
        <div class="past-image">foto kegiatan</div>
        <div class="past-text">
          <span class="past-title">{{ e.title }}</span>
          <span class="past-date">{{ e.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.section-title { font-size: 16px; font-weight: 800; }
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 12px;
}
.event-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.event-top {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.event-date {
  width: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  line-height: 1.1;
}
.event-day { font-size: 20px; font-weight: 800; }
.event-mon { font-size: 11px; font-weight: 700; }
.event-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.event-cat {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.event-title { font-size: 15px; font-weight: 700; text-wrap: pretty; }
.event-meta { font-size: 12px; color: #8A7563; }
.event-btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.past-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: 12px;
}
.past-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.past-image {
  aspect-ratio: 16 / 9;
  background: repeating-linear-gradient(135deg, #F3ECE2 0 10px, #EDE3D6 10px 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: #8A7563;
}
.past-text {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.past-title { font-size: 14px; font-weight: 700; }
.past-date { font-size: 12px; color: #8A7563; }
</style>
