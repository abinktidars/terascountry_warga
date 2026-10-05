<script setup>
import { usePortal } from '../../composables/usePortal'

const { complaintCats, form, setLokasi, setDesc, submitBg, submitComplaint, myComplaints } = usePortal()
</script>

<template>
  <section class="grid">
    <div class="form-card">
      <span class="section-title">Buat Laporan</span>
      <div class="cat-field">
        Kategori
        <div class="cats">
          <button v-for="(k, ki) in complaintCats" :key="ki" class="cat-chip" :style="{ borderColor: k.bd, background: k.bg, color: k.fg }" @click="k.pick">{{ k.label }}</button>
        </div>
      </div>
      <label class="field">Lokasi
        <input :value="form.lokasi" @input="setLokasi" placeholder="Contoh: Depan Blok C2" />
      </label>
      <label class="field">Deskripsi
        <textarea :value="form.desc" @input="setDesc" rows="4" placeholder="Jelaskan masalah yang ditemui…"></textarea>
      </label>
      <div class="photo-box">
        <span class="icon">add_a_photo</span>Lampirkan foto (opsional)
      </div>
      <button class="submit-btn" :style="{ background: submitBg }" @click="submitComplaint">Kirim Laporan</button>
    </div>

    <div class="list-card">
      <div class="list-head">Laporan Saya</div>
      <div v-for="c in myComplaints" :key="c.id" class="complaint-item">
        <div class="complaint-head">
          <span class="complaint-meta">#{{ c.id }} · {{ c.cat }} · {{ c.date }}</span>
          <span class="complaint-status" :style="{ background: c.bg, color: c.fg }">{{ c.status }}</span>
        </div>
        <span class="complaint-desc">{{ c.desc }}</span>
        <span class="complaint-lokasi">{{ c.lokasi }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  gap: 16px;
  align-items: start;
}
.form-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.section-title { font-size: 16px; font-weight: 800; }
.cat-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.cats {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.cat-chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.field input, .field textarea {
  padding: 12px 14px;
  border: 1px solid #EFE6DA;
  border-radius: 12px;
  background: #FAF6F0;
  font-size: 14px;
  outline: none;
  color: #2A1D14;
  resize: vertical;
}
.photo-box {
  border: 1.5px dashed #D9C7B2;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8A7563;
  font-size: 13px;
}
.photo-box .icon { font-size: 22px; }
.submit-btn {
  padding: 12px 16px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.list-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 8px 20px 12px;
}
.list-head { padding: 14px 0; font-size: 16px; font-weight: 800; }
.complaint-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 0;
  border-top: 1px solid #F3ECE2;
}
.complaint-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.complaint-meta { font-size: 12px; color: #8A7563; }
.complaint-status {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.complaint-desc { font-size: 14px; font-weight: 600; text-wrap: pretty; }
.complaint-lokasi { font-size: 12px; color: #8A7563; }
</style>
