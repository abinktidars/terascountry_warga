<script setup>
import { usePortal } from '../../composables/usePortal'

const { sosialFilters, sosialList } = usePortal()
</script>

<template>
  <section class="filters">
    <button v-for="(f, fi) in sosialFilters" :key="fi" class="filter-chip" :style="{ borderColor: f.bd, background: f.bg, color: f.fg }" @click="f.pick">{{ f.label }}</button>
  </section>

  <section class="sosial-grid">
    <div v-for="(s, si) in sosialList" :key="si" class="sosial-card">
      <div class="sosial-top">
        <span class="sosial-cat">{{ s.cat }}</span>
        <span class="sosial-rating"><span class="icon star-icon">star</span>{{ s.rating }}</span>
      </div>
      <div class="sosial-text">
        <span class="sosial-nama">{{ s.nama }}</span>
        <span class="sosial-desc">{{ s.desc }}</span>
      </div>
      <div class="sosial-bottom">
        <span class="sosial-rec">Direkomendasikan {{ s.rec }} warga</span>
        <button class="contact-btn" @click="s.contact">
          <span class="icon">{{ s.contactIcon }}</span>Hubungi
        </button>
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
.sosial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 12px;
}
.sosial-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sosial-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}
.sosial-cat {
  font-size: 11px;
  font-weight: 700;
  color: #7048D6;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.sosial-rating {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  font-weight: 700;
}
.star-icon {
  font-size: 16px;
  color: #F7702E;
  font-variation-settings: 'FILL' 1;
}
.sosial-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sosial-nama { font-size: 15px; font-weight: 700; }
.sosial-desc { font-size: 13px; color: #5E4B3C; line-height: 1.5; text-wrap: pretty; }
.sosial-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  flex-wrap: wrap;
}
.sosial-rec { font-size: 12px; color: #8A7563; }
.contact-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  background: #DDF1E4;
  color: #0A5C2C;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.contact-btn .icon { font-size: 16px; }
</style>
