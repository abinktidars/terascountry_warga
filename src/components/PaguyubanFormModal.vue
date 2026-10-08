<script setup>
import { usePortal } from '../composables/usePortal'

const {
  pgFormOpen, pgFormTitle, pgForm, stop, closePgForm, pgGroupOpts, pgShowBlok,
  setPgJabatan, setPgNama, setPgBlok, canSavePg, savePgForm
} = usePortal()
</script>

<template>
  <div v-if="pgFormOpen" class="overlay" @click="closePgForm">
    <div class="modal" @click="stop">
      <div class="head">
        <span class="head-title">{{ pgFormTitle }}</span>
        <button class="close-btn icon" @click="closePgForm">close</button>
      </div>
      <div class="section">
        <span class="section-label">Kelompok</span>
        <div class="status-opts">
          <button v-for="(g, gi) in pgGroupOpts" :key="gi" class="status-chip" :style="{ borderColor: g.bd }" @click="g.pick">{{ g.label }}</button>
        </div>
      </div>
      <div class="fields">
        <label class="field">Jabatan
          <input :value="pgForm.jabatan" @input="setPgJabatan" placeholder="Contoh: Ketua Koridor 1" />
        </label>
        <label class="field">Nama
          <input :value="pgForm.nama" @input="setPgNama" placeholder="Nama lengkap" />
        </label>
        <label v-if="pgShowBlok" class="field">Blok / Unit
          <input :value="pgForm.blok" @input="setPgBlok" placeholder="Blok A1 No. 01" />
        </label>
      </div>
      <button class="save-btn" :style="{ background: canSavePg ? '#A84503' : '#D9C7B2' }" @click="savePgForm">Simpan</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(42, 29, 20, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal {
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head-title { font-size: 16px; font-weight: 800; }
.close-btn {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  background: #F7EFE5;
  color: #5E4B3C;
  cursor: pointer;
}
.fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #5E4B3C;
}
.field input {
  padding: 11px 14px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  color: #2A1D14;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-label { font-size: 13px; font-weight: 700; color: #5E4B3C; }
.status-opts {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.status-chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid;
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #2A1D14;
}
.save-btn {
  padding: 14px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}
</style>
