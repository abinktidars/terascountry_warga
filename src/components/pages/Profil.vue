<script setup>
import { usePortal } from '../../composables/usePortal'

const { user, isAdmin, profileForm, profileEmail, profileSaving, setProfileField, canSaveProfile, saveProfile, resetProfileForm } = usePortal()
</script>

<template>
  <section class="profil">
    <div class="card identity">
      <div class="avatar" :style="{ background: user.color }">{{ user.ini }}</div>
      <div class="identity-text">
        <span class="name">{{ user.name }}</span>
        <span class="sub">{{ user.sub }}</span>
        <span class="role">{{ isAdmin ? 'Pengurus' : 'Warga' }}</span>
      </div>
    </div>

    <div class="card form">
      <span class="section-title">Data Profil</span>
      <label class="field">Email
        <input :value="profileEmail" disabled />
        <span class="hint">Email dipakai untuk masuk dan tidak bisa diubah di sini.</span>
      </label>
      <label class="field">Nama Lengkap
        <input :value="profileForm.name" @input="setProfileField('name')($event)" placeholder="Nama lengkap" />
      </label>
      <label class="field">No. HP
        <input type="tel" :value="profileForm.phone" @input="setProfileField('phone')($event)" placeholder="0812xxxxxxx" />
      </label>
      <label class="field">Blok / Unit Rumah
        <input :value="profileForm.unit" @input="setProfileField('unit')($event)" placeholder="Blok C2 No. 14" />
      </label>
      <label v-if="isAdmin" class="field">Jabatan
        <input :value="profileForm.jabatan" @input="setProfileField('jabatan')($event)" placeholder="Ketua Paguyuban" />
      </label>
      <div class="actions">
        <button class="reset-btn" :disabled="profileSaving" @click="resetProfileForm">Batalkan</button>
        <button class="save-btn" :style="{ background: canSaveProfile ? '#A84503' : '#D9C7B2' }" :disabled="!canSaveProfile" @click="saveProfile">
          {{ profileSaving ? 'Menyimpan…' : 'Simpan Perubahan' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profil {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 16px;
  align-items: start;
}
.card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
}
.identity {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
}
.identity-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.name { font-size: 18px; font-weight: 800; }
.sub { font-size: 13px; color: #8A7563; }
.role {
  align-self: flex-start;
  margin-top: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: #F7EFE5;
  color: #A84503;
  font-size: 12px;
  font-weight: 700;
}
.form { display: flex; flex-direction: column; gap: 14px; }
.section-title { font-size: 16px; font-weight: 800; }
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.field input {
  padding: 12px 14px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #FAF6F0;
  font-size: 14px;
  outline: none;
  color: #2A1D14;
}
.field input:disabled { color: #8A7563; background: #F3ECE2; }
.hint { font-size: 12px; font-weight: 400; color: #8A7563; }
.actions { display: flex; gap: 10px; justify-content: flex-end; }
.reset-btn, .save-btn {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.reset-btn { border: 1px solid #EFE6DA; background: #fff; color: #5E4B3C; }
.save-btn { border: 0; color: #fff; }
</style>
