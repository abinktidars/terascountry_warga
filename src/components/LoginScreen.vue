<script setup>
import { usePortal } from '../composables/usePortal'
import logoTc from '../assets/logo-tc.png'

const {
  wide, narrow, backHome,
  loginSub, loginTabs, state, setLoginId, setLoginPw, pwType, pwIcon, togglePw,
  loginBtn, fillDemo, doLogin
} = usePortal()
</script>

<template>
  <div class="login-grid">
    <div v-if="wide" class="login-side">
      <div class="side-circle"></div>
      <div class="side-top">
        <img :src="logoTc" alt="Teras Country Warga" class="side-logo" />
        <span class="side-brand">Teras Country</span>
      </div>
      <div class="side-mid">
        <span class="side-title">Satu portal untuk semua urusan warga.</span>
        <span class="side-desc">Masuk untuk membayar IPL, melihat data warga, jadwal security, melapor keluhan, dan mengunduh surat pengantar.</span>
      </div>
      <span class="side-foot">© 2026 Paguyuban Warga Teras Country</span>
    </div>

    <div class="login-form-wrap">
      <div class="login-form">
        <button class="back-btn" @click="backHome">
          <span class="icon">arrow_back</span>Kembali ke beranda
        </button>

        <div class="title-block">
          <img v-if="narrow" :src="logoTc" alt="Teras Country Warga" class="narrow-logo" />
          <span class="title">Masuk</span>
          <span class="subtitle">{{ loginSub }}</span>
        </div>

        <div class="tabs">
          <button v-for="t in loginTabs" :key="t.label" class="tab" :style="{ background: t.bg, color: t.fg, boxShadow: t.sh }" @click="t.pick">{{ t.label }}</button>
        </div>

        <div class="fields">
          <label class="field">Nomor HP atau Email
            <input :value="state.loginId" @input="setLoginId" placeholder="0812xxxxxxx" />
          </label>
          <label class="field">Kata Sandi
            <div class="pw-wrap">
              <input :type="pwType" :value="state.loginPw" @input="setLoginPw" placeholder="••••••••" class="pw-input" />
              <button class="pw-toggle icon" aria-label="Tampilkan sandi" @click="togglePw">{{ pwIcon }}</button>
            </div>
          </label>
          <div class="row-between">
            <label class="remember"><input type="checkbox" checked />Ingat saya</label>
            <a href="#" class="forgot">Lupa kata sandi?</a>
          </div>
          <div v-if="state.loginErr" class="error">
            <span class="icon">error</span>{{ state.loginErr }}
          </div>
          <button class="btn-primary" @click="doLogin">{{ loginBtn }}</button>
          <button class="btn-demo" @click="fillDemo">Isi otomatis akun demo</button>
        </div>

        <div class="help-box">Belum punya akun? Akun warga dibuat oleh sekretariat paguyuban. Hubungi sekretariat di Balai Warga atau WhatsApp <strong>0812-0000-0000</strong>.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-grid {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
}
.login-side {
  background: #A84503;
  color: #fff;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  overflow: hidden;
}
.side-circle {
  position: absolute;
  right: -120px;
  bottom: -120px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  border: 48px solid rgba(255, 255, 255, 0.07);
}
.side-top {
  display: flex;
  align-items: center;
  gap: 12px;
}
.side-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
}
.side-brand {
  font-weight: 800;
  font-size: 17px;
}
.side-mid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 440px;
  position: relative;
}
.side-title {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  text-wrap: pretty;
}
.side-desc {
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.9;
  text-wrap: pretty;
}
.side-foot {
  font-size: 13px;
  opacity: 0.75;
}
.login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}
.login-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.back-btn {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: none;
  padding: 0;
  color: #6B5848;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.back-btn .icon { font-size: 20px; }
.title-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.narrow-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-bottom: 8px;
}
.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.subtitle {
  font-size: 14px;
  color: #6B5848;
  line-height: 1.5;
}
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  background: #F0E7DB;
  border-radius: 12px;
}
.tab {
  padding: 10px;
  border: 0;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}
.field input {
  padding: 13px 14px;
  border: 1px solid #E5D9C9;
  border-radius: 12px;
  background: #fff;
  font-size: 15px;
  outline: none;
  color: #2A1D14;
}
.pw-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #E5D9C9;
  border-radius: 12px;
  background: #fff;
  padding-right: 6px;
}
.pw-input {
  flex: 1;
  min-width: 0;
  padding: 13px 14px;
  border: 0 !important;
  background: none;
  font-size: 15px;
  outline: none;
  color: #2A1D14;
}
.pw-toggle {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  color: #8A7563;
  font-size: 20px;
}
.row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #5E4B3C;
  cursor: pointer;
}
.remember input {
  accent-color: #A84503;
  width: 16px;
  height: 16px;
}
.forgot {
  font-size: 13px;
  font-weight: 600;
}
.error {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: #FDE9DC;
  color: #9A3412;
  font-size: 13px;
  font-weight: 600;
}
.error .icon { font-size: 18px; }
.btn-primary {
  padding: 14px;
  border: 0;
  border-radius: 12px;
  background: #A84503;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
.btn-primary:hover { background: #8F3A02; }
.btn-demo {
  padding: 12px;
  border: 1px dashed #D9C7B2;
  border-radius: 12px;
  background: none;
  color: #6B5848;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.help-box {
  padding: 14px 16px;
  border-radius: 12px;
  background: #F7EFE5;
  font-size: 13px;
  color: #5E4B3C;
  line-height: 1.6;
  text-wrap: pretty;
}
.help-box strong { color: #2A1D14; }
</style>
