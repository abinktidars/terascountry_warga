<script setup>
import { usePortal } from '../../composables/usePortal'

const { cFilters, admComplaints } = usePortal()
</script>

<template>
  <section class="filters">
    <button v-for="(f, fi) in cFilters" :key="fi" class="filter-chip" :style="{ borderColor: f.bd, background: f.bg, color: f.fg }" @click="f.pick">{{ f.label }}</button>
  </section>

  <section class="grid">
    <div v-for="c in admComplaints" :key="c.id" class="complaint-card">
      <div class="complaint-head">
        <span class="complaint-id">#{{ c.id }} · {{ c.cat }}</span>
        <span class="complaint-status" :style="{ background: c.bg, color: c.fg }">{{ c.status }}</span>
      </div>
      <span class="complaint-desc">{{ c.desc }}</span>
      <div class="complaint-meta">
        <span>{{ c.lokasi }}</span>
        <span>Dilaporkan {{ c.reporter }} · {{ c.date }}</span>
      </div>
      <button v-if="c.hasAct" class="act-btn" :style="{ background: c.actBg }" @click="c.act">{{ c.actLabel }}</button>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-chip {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 12px;
}
.complaint-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.complaint-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.complaint-id { font-size: 12px; font-weight: 700; color: #A84503; }
.complaint-status {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
.complaint-desc { font-size: 15px; font-weight: 700; text-wrap: pretty; line-height: 1.4; }
.complaint-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  color: #8A7563;
}
.act-btn {
  margin-top: 4px;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
</style>
