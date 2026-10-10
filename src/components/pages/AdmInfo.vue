<script setup>
import { usePortal } from '../../composables/usePortal'

const { ann, setAnnTitle, setAnnBody, audOpts, annBtnBg, publishAnn, admAnnouncements, heroImageUrl, heroImageUploading, uploadHeroImage } = usePortal()

function onHeroImageChange(event) {
  const file = event.target.files?.[0]
  if (file) uploadHeroImage(file)
  event.target.value = ''
}
</script>

<template>
  <div class="content">
    <section class="hero-settings">
      <div class="hero-copy">
        <span class="section-title">Foto Beranda</span>
        <span class="hero-hint">Gambar utama yang tampil di homepage publik. JPG, PNG, atau WebP, maksimal 5 MB.</span>
      </div>
      <div class="hero-preview" :class="{ 'has-image': heroImageUrl }">
        <img v-if="heroImageUrl" :src="heroImageUrl" alt="Preview foto beranda" />
        <span v-else>Belum ada foto beranda</span>
      </div>
      <label class="upload-btn" :class="{ uploading: heroImageUploading }">
        <span class="icon">{{ heroImageUploading ? 'hourglass_top' : 'upload' }}</span>
        {{ heroImageUploading ? 'Mengunggah…' : heroImageUrl ? 'Ganti foto' : 'Upload foto' }}
        <input type="file" accept="image/jpeg,image/png,image/webp" :disabled="heroImageUploading" @change="onHeroImageChange" />
      </label>
    </section>

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
  </div>
</template>

<style scoped>
.content {
  display: grid;
  gap: 16px;
}
.hero-settings {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(220px, 1.4fr) auto;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  background: #fff;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hero-hint { font-size: 12px; color: #8A7563; line-height: 1.5; }
.hero-preview {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 108px;
  overflow: hidden;
  border-radius: 8px;
  background: repeating-linear-gradient(135deg, #F3ECE2 0 12px, #EDE3D6 12px 24px);
  color: #8A7563;
  font-size: 12px;
}
.hero-preview img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 8px;
  background: #A84503;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
.upload-btn.uploading { opacity: 0.65; cursor: wait; }
.upload-btn input { display: none; }
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
@media (max-width: 700px) {
  .hero-settings { grid-template-columns: 1fr; }
  .hero-preview { min-height: 160px; }
  .upload-btn { justify-self: start; }
}
</style>
