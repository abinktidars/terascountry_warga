<script setup>
import { usePortal } from '../../composables/usePortal'

const { unitFilters, remindAll, unitCount, unitList } = usePortal()
</script>

<template>
  <section class="toolbar">
    <div class="filters">
      <button v-for="(f, fi) in unitFilters" :key="fi" class="filter-chip" :style="{ borderColor: f.bd, background: f.bg, color: f.fg }" @click="f.pick">{{ f.label }}</button>
    </div>
    <button class="remind-btn" @click="remindAll">
      <span class="icon">send</span>Ingatkan yang Belum Bayar
    </button>
  </section>

  <section class="list-card">
    <div class="list-head">
      <span class="section-title">Status IPL Oktober 2026</span>
      <span class="count">Menampilkan {{ unitCount }} unit</span>
    </div>
    <div v-for="(u, ui) in unitList" :key="ui" class="unit-row">
      <div class="unit-blok">{{ u.blok }}</div>
      <div class="unit-info">
        <span class="unit-nama">{{ u.nama }}</span>
        <span class="unit-sub">{{ u.unit }} · {{ u.note }}</span>
      </div>
      <span class="unit-status" :style="{ background: u.bg, color: u.fg }">{{ u.status }}</span>
      <div class="unit-action">
        <button v-if="u.hasAct" class="act-btn" :style="{ borderColor: u.actBd, background: u.actBg, color: u.actFg }" @click="u.act">{{ u.actLabel }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
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
.remind-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 0;
  border-radius: 12px;
  background: #2A1D14;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.remind-btn .icon { font-size: 18px; }

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
  gap: 12px;
  flex-wrap: wrap;
}
.section-title { font-size: 16px; font-weight: 800; }
.count { font-size: 13px; color: #8A7563; }
.unit-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
  flex-wrap: wrap;
}
.unit-blok {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #F7EFE5;
  color: #A84503;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
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
.unit-status {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  min-width: 110px;
  text-align: center;
}
.unit-action {
  width: 104px;
  display: flex;
  justify-content: flex-end;
}
.act-btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
</style>
