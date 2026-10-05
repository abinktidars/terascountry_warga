<script setup>
import { usePortal } from '../composables/usePortal'

const { payOpen, paySuccess, payForm, closePay, stop, payMonths, methods, payTotalFmt, payBtnBg, confirmPay } = usePortal()
</script>

<template>
  <div v-if="payOpen" class="overlay" @click="closePay">
    <div class="modal" @click="stop">
      <div v-if="paySuccess" class="success">
        <span class="success-icon icon">check</span>
        <span class="success-title">Pembayaran Berhasil</span>
        <span class="success-desc">Terima kasih, IPL Anda sudah tercatat lunas.</span>
        <button class="success-btn" @click="closePay">Selesai</button>
      </div>
      <template v-if="payForm">
        <div class="head">
          <span class="head-title">Bayar IPL</span>
          <button class="close-btn icon" @click="closePay">close</button>
        </div>
        <div class="section">
          <span class="section-label">Pilih bulan</span>
          <div class="chips">
            <button v-for="(m, mi) in payMonths" :key="mi" class="chip" :style="{ borderColor: m.bd, background: m.bg, color: m.fg }" @click="m.toggle">{{ m.label }}</button>
          </div>
        </div>
        <div class="section">
          <span class="section-label">Metode pembayaran</span>
          <button v-for="(m, mi) in methods" :key="mi" class="method" :style="{ borderColor: m.bd }" @click="m.pick">
            <span class="method-icon icon">{{ m.icon }}</span>
            <span class="method-text">
              <span class="method-label">{{ m.label }}</span>
              <span class="method-sub">{{ m.sub }}</span>
            </span>
            <span class="method-dot" :style="{ borderColor: m.bd, background: m.dot }"></span>
          </button>
        </div>
        <div class="total-row">
          <span class="total-label">Total</span>
          <span class="total-value">{{ payTotalFmt }}</span>
        </div>
        <button class="pay-btn" :style="{ background: payBtnBg }" @click="confirmPay">Bayar {{ payTotalFmt }}</button>
      </template>
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
  max-width: 440px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 12px 0;
}
.success-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #DDF1E4;
  color: #0A7C3A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
}
.success-title { font-size: 20px; font-weight: 800; }
.success-desc { font-size: 14px; color: #5E4B3C; }
.success-btn {
  margin-top: 8px;
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 12px;
  background: #2A1D14;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head-title { font-size: 18px; font-weight: 800; }
.close-btn {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: #F7EFE5;
  cursor: pointer;
  font-size: 20px;
  color: #2A1D14;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-label { font-size: 13px; font-weight: 600; }
.chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.method {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid;
  background: #fff;
  cursor: pointer;
  text-align: left;
  color: #2A1D14;
  width: 100%;
  margin-bottom: 8px;
}
.method:last-child { margin-bottom: 0; }
.method-icon { font-size: 22px; color: #A84503; }
.method-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.method-label { font-size: 14px; font-weight: 700; }
.method-sub { font-size: 12px; color: #8A7563; }
.method-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid #F3ECE2;
}
.total-label { font-size: 14px; color: #5E4B3C; }
.total-value { font-size: 22px; font-weight: 800; }
.pay-btn {
  padding: 14px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
</style>
