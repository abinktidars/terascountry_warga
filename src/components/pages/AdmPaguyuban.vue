<script setup>
import { usePortal } from '../../composables/usePortal'

const { pengurusInti, ketuaKoridor, pengurusBidang, pgIsDefault, pgGroups, addPg, seedPg } = usePortal()

const groups = [
  { key: 'inti', items: pengurusInti },
  { key: 'koridor', items: ketuaKoridor },
  { key: 'bidang', items: pengurusBidang }
]
</script>

<template>
  <section v-if="pgIsDefault" class="seed-card">
    <span class="seed-text">Belum ada data di database. Muat data awal ke database dulu agar bisa ditambah, diubah, dan dihapus.</span>
    <button class="add-btn" @click="seedPg">Isi data awal</button>
  </section>

  <template v-if="!pgIsDefault">
  <section v-for="g in groups" :key="g.key" class="list-card">
    <div class="toolbar">
      <span class="section-title">{{ pgGroups[g.key] }}</span>
      <button class="add-btn" @click="addPg(g.key)"><span class="icon">add</span>Tambah</button>
    </div>
    <div class="rows">
      <div v-for="p in g.items.value" :key="p.id" class="row">
        <div class="row-avatar" :style="{ background: p.tint, color: p.color }">{{ p.ini }}</div>
        <div class="row-info">
          <span class="row-nama">{{ p.nama }}</span>
          <span class="row-sub">{{ p.jabatan }}<template v-if="p.blok"> · {{ p.blok }}</template></span>
        </div>
        <button class="edit-btn icon" aria-label="Ubah" @click="p.edit">edit</button>
        <button class="edit-btn icon" aria-label="Hapus" @click="p.del">delete</button>
      </div>
      <div v-if="!g.items.value.length" class="empty">Belum ada data.</div>
    </div>
  </section>
  </template>
</template>

<style scoped>
.seed-card {
  background: #FFF3D6;
  border: 1px solid #F0DDA8;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.seed-text { flex: 1; min-width: 220px; font-size: 14px; color: #8A5A00; }
.list-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.section-title { font-size: 16px; font-weight: 800; }
.add-btn {
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
.rows { display: flex; flex-direction: column; }
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
}
.row-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
}
.row-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.row-nama { font-size: 14px; font-weight: 700; }
.row-sub { font-size: 12px; color: #8A7563; }
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
.empty { padding: 24px 0; text-align: center; font-size: 14px; color: #8A7563; }
</style>
