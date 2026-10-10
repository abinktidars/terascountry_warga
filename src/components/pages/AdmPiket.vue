<script setup>
import { ref } from 'vue'
import { usePortal } from '../../composables/usePortal'

const {
  piketEditor, piketSaving, securityGuards, setPiketRange, savePiketSchedule,
  savePiketGuard, deletePiketGuard
} = usePortal()

const guardForm = ref({ id: null, name: '', phone: '' })

function editGuard(guard) {
  guardForm.value = { ...guard }
}

function clearGuardForm() {
  guardForm.value = { id: null, name: '', phone: '' }
}

async function submitGuard() {
  const saved = await savePiketGuard(guardForm.value.id, guardForm.value.name, guardForm.value.phone)
  if (saved) clearGuardForm()
}

function removeGuard(guard) {
  if (window.confirm(`Hapus ${guard.name} dari daftar satpam? Jadwal shiftnya juga akan dikosongkan.`)) {
    deletePiketGuard(guard.id)
    if (guardForm.value.id === guard.id) clearGuardForm()
  }
}
</script>

<template>
  <section class="schedule-card">
    <div class="schedule-copy">
      <span class="section-title">Kelola Data Satpam</span>
      <span class="schedule-hint">Tambah, ubah, atau hapus nama dan nomor telepon satpam.</span>
    </div>

    <form class="guard-form" @submit.prevent="submitGuard">
      <label class="field">
        Nama satpam
        <input v-model="guardForm.name" required placeholder="Nama satpam" />
      </label>
      <label class="field">
        Nomor HP
        <input v-model="guardForm.phone" type="tel" placeholder="Contoh: 0812xxxxxxx" />
      </label>
      <div class="guard-form-actions">
        <button class="save-btn" type="submit">
          <span class="icon">{{ guardForm.id ? 'save' : 'add' }}</span>
          {{ guardForm.id ? 'Simpan perubahan' : 'Tambah satpam' }}
        </button>
        <button v-if="guardForm.id" class="cancel-btn" type="button" @click="clearGuardForm">Batal</button>
      </div>
    </form>

    <div class="guard-list">
      <div v-for="guard in securityGuards" :key="guard.id" class="guard-row">
        <div class="guard-info">
          <span class="guard-name">{{ guard.name }}</span>
          <span class="guard-phone">{{ guard.phone || 'Nomor HP belum diisi' }}</span>
        </div>
        <div class="row-actions">
          <button class="row-btn icon" type="button" :aria-label="`Ubah ${guard.name}`" @click="editGuard(guard)">edit</button>
          <button class="row-btn icon" type="button" :aria-label="`Hapus ${guard.name}`" @click="removeGuard(guard)">delete</button>
        </div>
      </div>
      <div v-if="!securityGuards.length" class="empty">Belum ada data satpam.</div>
    </div>
  </section>

  <section class="schedule-card">
    <div class="schedule-head">
      <div class="schedule-copy">
        <span class="section-title">Atur Jadwal Piket</span>
        <span class="schedule-hint">Perubahan akan langsung tampil di halaman Jadwal Security.</span>
      </div>
      <button class="save-btn" :disabled="piketSaving" @click="savePiketSchedule">
        <span class="icon">{{ piketSaving ? 'hourglass_top' : 'save' }}</span>
        {{ piketSaving ? 'Menyimpan…' : 'Simpan jadwal' }}
      </button>
    </div>

    <label class="field">
      Rentang jadwal
      <input :value="piketEditor.range" placeholder="Contoh: 5–11 Okt 2026" @input="setPiketRange" />
    </label>

    <div class="table-scroll">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Hari</th>
            <th v-for="shift in ['Pagi', 'Siang', 'Malam']" :key="shift">{{ shift }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in piketEditor.rows" :key="row.day">
            <th>{{ row.day }}</th>
            <td v-for="(name, shiftIndex) in row.shifts" :key="`${row.day}-${shiftIndex}`">
              <input v-model="piketEditor.rows[rowIndex].shifts[shiftIndex]" :aria-label="`${row.day}, shift ${shiftIndex + 1}`" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.schedule-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.schedule-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.schedule-copy { display: flex; flex-direction: column; gap: 4px; }
.section-title { font-size: 16px; font-weight: 800; }
.schedule-hint { font-size: 13px; color: #8A7563; }
.guard-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  align-items: end;
  gap: 12px;
}
.save-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: #2A1D14;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.save-btn:disabled { opacity: 0.65; cursor: wait; }
.guard-form-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.cancel-btn {
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid #EFE6DA;
  border-radius: 10px;
  background: #fff;
  color: #5E4B3C;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.field input, .schedule-table input {
  width: 100%;
  min-width: 110px;
  padding: 10px 12px;
  border: 1px solid #EFE6DA;
  border-radius: 8px;
  background: #FAF6F0;
  color: #2A1D14;
  font: inherit;
}
.guard-list { display: flex; flex-direction: column; }
.guard-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #F3ECE2;
}
.guard-info { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 3px; }
.guard-name { font-size: 14px; font-weight: 700; }
.guard-phone, .empty { font-size: 12px; color: #8A7563; }
.row-actions { display: flex; gap: 8px; }
.row-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #EFE6DA;
  border-radius: 10px;
  background: #fff;
  color: #5E4B3C;
  font-size: 18px;
  cursor: pointer;
}
.row-btn:hover { background: #F7EFE5; }
.empty { padding: 20px 0; text-align: center; }
.table-scroll { overflow-x: auto; }
.schedule-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 13px;
}
.schedule-table th, .schedule-table td {
  padding: 8px;
  border-bottom: 1px solid #F3ECE2;
  text-align: left;
}
.schedule-table th { color: #8A7563; font-weight: 700; }
.schedule-table tbody th { color: #2A1D14; }
</style>
