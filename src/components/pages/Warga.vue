<script setup>
import { usePortal } from '../../composables/usePortal'

const { wargaStats, state, setQ, isAdminWarga, addWarga, wargaFilters, wargaList, wargaEmpty } = usePortal()
</script>

<template>
  <section class="stats-grid">
    <div v-for="(st, si) in wargaStats" :key="si" class="stat-card">
      <span class="stat-label"><span class="stat-dot" :style="{ background: st.color }"></span>{{ st.label }}</span>
      <span class="stat-value">{{ st.value }}</span>
    </div>
  </section>

  <section class="list-card">
    <div class="toolbar">
      <div class="search-box">
        <span class="icon search-icon">search</span>
        <input :value="state.q" @input="setQ" placeholder="Cari nama atau blok…" />
      </div>
      <button v-if="isAdminWarga" class="add-btn" @click="addWarga">
        <span class="icon">person_add</span>Tambah Warga
      </button>
    </div>
    <div class="filters">
      <button v-for="(f, fi) in wargaFilters" :key="fi" class="filter-chip" :style="{ borderColor: f.bd, background: f.bg, color: f.fg }" @click="f.pick">{{ f.label }}</button>
    </div>
    <div class="rows">
      <div v-for="(w, wi) in wargaList" :key="wi" class="row">
        <div class="row-blok">{{ w.blok }}</div>
        <div class="row-info">
          <span class="row-nama">{{ w.nama }}</span>
          <span class="row-sub">{{ w.unit }} · {{ w.jml }}</span>
        </div>
        <span v-if="isAdminWarga" class="row-phone">{{ w.phone }}</span>
        <span class="row-status" :style="{ background: w.bg, color: w.fg }">{{ w.status }}</span>
        <button v-if="isAdminWarga" class="edit-btn icon" aria-label="Ubah" @click="w.edit">edit</button>
        <button v-if="isAdminWarga" class="edit-btn icon" aria-label="Hapus" @click="w.del">delete</button>
      </div>
      <div v-if="wargaEmpty" class="empty">Tidak ada data yang cocok.</div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
  gap: 12px;
}
.stat-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.stat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #8A7563;
}
.stat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.stat-value { font-size: 26px; font-weight: 800; }

.list-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.search-box {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #FAF6F0;
}
.search-icon { font-size: 20px; color: #8A7563; }
.search-box input {
  flex: 1;
  border: 0;
  background: none;
  padding: 12px 0;
  font-size: 14px;
  outline: none;
  color: #2A1D14;
}
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 14px;
  border: 0;
  border-radius: 12px;
  background: #2A1D14;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.rows {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
  flex-wrap: wrap;
}
.row-blok {
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
.row-info {
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.row-nama { font-size: 14px; font-weight: 700; }
.row-sub { font-size: 12px; color: #8A7563; }
.row-phone { font-size: 12px; color: #5E4B3C; min-width: 110px; }
.row-status {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.edit-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #EFE6DA;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  color: #5E4B3C;
  font-size: 18px;
}
.edit-btn:hover { background: #F7EFE5; }
.empty {
  padding: 32px 0;
  text-align: center;
  font-size: 14px;
  color: #8A7563;
}
</style>
