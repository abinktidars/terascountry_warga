<script setup>
import { usePortal } from '../../composables/usePortal'

const { asetFilters, asetList } = usePortal()
</script>

<template>
  <section class="filters">
    <button v-for="(f, fi) in asetFilters" :key="fi" class="filter-chip" :style="{ borderColor: f.bd, background: f.bg, color: f.fg }" @click="f.pick">{{ f.label }}</button>
  </section>

  <section class="aset-grid">
    <div v-for="(a, ai) in asetList" :key="ai" class="aset-card">
      <div class="aset-top">
        <span class="aset-icon icon">{{ a.icon }}</span>
        <span class="aset-kondisi" :style="{ background: a.bg, color: a.fg }">{{ a.kondisi }}</span>
      </div>
      <div class="aset-text">
        <span class="aset-nama">{{ a.nama }}</span>
        <span class="aset-sub">{{ a.jml }} · {{ a.lokasi }}</span>
      </div>
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
.aset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: 12px;
}
.aset-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.aset-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.aset-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #DDF1E4;
  color: #0A7C3A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.aset-kondisi {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
.aset-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.aset-nama { font-size: 15px; font-weight: 700; }
.aset-sub { font-size: 12px; color: #8A7563; }
</style>
