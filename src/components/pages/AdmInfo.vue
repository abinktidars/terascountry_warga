<script setup>
import { usePortal } from '../../composables/usePortal'

const { ann, setAnnTitle, setAnnBody, audOpts, annBtnBg, publishAnn, admAnnouncements } = usePortal()
</script>

<template>
  <section class="grid">
    <div class="form-card">
      <span class="section-title">Buat Pengumuman</span>
      <label class="field">Judul
        <input :value="ann.title" @input="setAnnTitle" placeholder="Judul pengumuman" />
      </label>
      <label class="field">Isi
        <textarea :value="ann.body" @input="setAnnBody" rows="5" placeholder="Tulis isi pengumuman…"></textarea>
      </label>
      <div class="aud-field">Dapat dilihat oleh
        <div class="aud-grid">
          <button v-for="(o, oi) in audOpts" :key="oi" class="aud-opt" :style="{ borderColor: o.bd }" @click="o.pick">
            <span class="aud-label"><span class="icon aud-icon">{{ o.icon }}</span>{{ o.label }}</span>
            <span class="aud-sub">{{ o.sub }}</span>
          </button>
        </div>
      </div>
      <button class="publish-btn" :style="{ background: annBtnBg }" @click="publishAnn">Terbitkan</button>
    </div>

    <div class="list-card">
      <div class="list-head">Pengumuman Terbit</div>
      <div v-for="a in admAnnouncements" :key="a.id" class="ann-row">
        <div class="ann-text">
          <div class="ann-meta">
            <span class="ann-date">{{ a.date }}</span>
            <span class="ann-aud" :style="{ background: a.audBg, color: a.audFg }">{{ a.audLabel }}</span>
          </div>
          <span class="ann-title">{{ a.title }}</span>
        </div>
        <button class="del-btn icon" aria-label="Hapus" @click="a.del">delete</button>
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
.aud-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.aud-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.aud-opt {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid;
  background: #fff;
  cursor: pointer;
  text-align: left;
  color: #2A1D14;
}
.aud-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
}
.aud-icon { font-size: 18px; color: #A84503; }
.aud-sub { font-size: 12px; font-weight: 500; color: #8A7563; }
.publish-btn {
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
.ann-row {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid #F3ECE2;
  align-items: flex-start;
}
.ann-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ann-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.ann-date { font-size: 12px; color: #8A7563; }
.ann-aud {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 6px;
}
.ann-title { font-size: 14px; font-weight: 700; text-wrap: pretty; }
.del-btn {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: 0;
  border-radius: 10px;
  background: none;
  cursor: pointer;
  color: #8A7563;
  font-size: 18px;
}
.del-btn:hover { background: #FDE9DC; }
</style>
