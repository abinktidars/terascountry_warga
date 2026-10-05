<script setup>
import { usePortal } from '../../composables/usePortal'

const { outstandingFmt, openPay, paidYearFmt, paidCount, iplRows } = usePortal()
</script>

<template>
  <section class="summary-grid">
    <div class="summary-card dark">
      <span class="summary-label">Belum dibayar</span>
      <span class="summary-value">{{ outstandingFmt }}</span>
      <button class="pay-btn" @click="openPay">Bayar IPL</button>
    </div>
    <div class="summary-card">
      <span class="summary-label light">Tarif IPL / bulan</span>
      <span class="summary-value">Rp 250.000</span>
      <span class="summary-sub">Keamanan, kebersihan, PJU, taman</span>
    </div>
    <div class="summary-card">
      <span class="summary-label light">Dibayar tahun 2026</span>
      <span class="summary-value">{{ paidYearFmt }}</span>
      <span class="summary-sub">{{ paidCount }} dari 12 bulan</span>
    </div>
  </section>

  <section class="history-card">
    <div class="history-head">Riwayat Tagihan 2026</div>
    <div v-for="(r, ri) in iplRows" :key="ri" class="history-row">
      <div class="history-info">
        <span class="history-month">{{ r.month }}</span>
        <span class="history-note">{{ r.note }}</span>
      </div>
      <span class="history-amount">Rp 250.000</span>
      <span class="history-status" :style="{ background: r.bg, color: r.fg }">{{ r.status }}</span>
    </div>
  </section>
</template>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 12px;
}
.summary-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.summary-card.dark {
  background: #2A1D14;
  color: #fff;
  border: 0;
}
.summary-label { font-size: 13px; opacity: 0.75; }
.summary-label.light { opacity: 1; color: #8A7563; }
.summary-value { font-size: 26px; font-weight: 800; }
.summary-sub { font-size: 12px; color: #8A7563; }
.pay-btn {
  margin-top: 8px;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  background: #F7702E;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
}

.history-card {
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  padding: 8px 20px 12px;
}
.history-head {
  padding: 14px 0;
  font-size: 16px;
  font-weight: 800;
}
.history-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid #F3ECE2;
  flex-wrap: wrap;
}
.history-info {
  flex: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.history-month { font-size: 14px; font-weight: 700; }
.history-note { font-size: 12px; color: #8A7563; }
.history-amount { font-size: 14px; font-weight: 700; min-width: 100px; }
.history-status {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  min-width: 96px;
  text-align: center;
}
</style>
