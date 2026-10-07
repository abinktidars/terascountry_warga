<script setup>
import { usePortal } from '../composables/usePortal'
import logoTc from '../assets/logo-tc.png'
import PayModal from './PayModal.vue'
import WargaFormModal from './WargaFormModal.vue'

import BerandaPublic from './pages/BerandaPublic.vue'
import BerandaWarga from './pages/BerandaWarga.vue'
import Ipl from './pages/Ipl.vue'
import Warga from './pages/Warga.vue'
import Paguyuban from './pages/Paguyuban.vue'
import Kegiatan from './pages/Kegiatan.vue'
import Piket from './pages/Piket.vue'
import Cctv from './pages/Cctv.vue'
import Keluhan from './pages/Keluhan.vue'
import Surat from './pages/Surat.vue'
import Aset from './pages/Aset.vue'
import Sosial from './pages/Sosial.vue'
import AdmDash from './pages/AdmDash.vue'
import AdmIpl from './pages/AdmIpl.vue'
import AdmKeluhan from './pages/AdmKeluhan.vue'
import AdmInfo from './pages/AdmInfo.vue'

const {
  state, isDesktop, isCompact, roleLabel, user, isPublic, isLogged, isAdmin, logout, openLogin,
  navGroups, pageTitle, crumb, toggleNotif, notifOpen, notifs, openDrawer,
  showPublicHome, showWargaHome, showWargaData, is,
  bottomNav, drawerOpen, closeDrawer, stop
} = usePortal()
</script>

<template>
  <div class="shell">
    <aside v-if="isDesktop" class="sidebar">
      <div class="brand">
        <img :src="logoTc" alt="Teras Country Warga" class="brand-logo" />
        <div class="brand-text">
          <span class="brand-name">Teras Country</span>
          <span class="brand-sub">{{ roleLabel }}</span>
        </div>
      </div>
      <nav class="nav">
        <div v-for="(g, gi) in navGroups" :key="gi" class="nav-group">
          <span v-if="g.title" class="nav-group-title">{{ g.title }}</span>
          <button v-for="(item, ii) in g.items" :key="ii" class="nav-item" :style="{ background: item.navBg, color: item.navFg, fontWeight: item.navW }" @click="item.go">
            <span class="icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="item.locked" class="icon nav-lock">lock</span>
            <span v-if="item.soon" class="nav-soon">SOON</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </button>
        </div>
      </nav>
      <div v-if="isPublic" class="sidebar-cta">
        <span class="cta-title">Anda warga Teras Country?</span>
        <span class="cta-desc">Masuk untuk membuka IPL, data warga, surat, dan fitur lainnya.</span>
        <button class="cta-btn" @click="openLogin">Masuk Warga</button>
      </div>
      <div v-if="isLogged" class="sidebar-user">
        <div class="user-avatar" :style="{ background: user.color }">{{ user.ini }}</div>
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-sub">{{ user.sub }}</span>
        </div>
        <button class="user-logout icon" aria-label="Keluar" title="Keluar" @click="logout">logout</button>
      </div>
    </aside>

    <div class="content-col">
      <header class="header">
        <img v-if="isCompact" :src="logoTc" alt="Teras Country Warga" class="header-logo" />
        <div class="header-title">
          <span class="header-crumb">{{ crumb }}</span>
          <span class="header-page">{{ pageTitle }}</span>
        </div>
        <span v-if="isAdmin" class="header-badge">Pengurus</span>
        <button v-if="isPublic" class="header-login" @click="openLogin">
          <span class="icon">login</span>Masuk
        </button>
        <button v-if="isLogged" class="header-icon-btn" @click="toggleNotif">
          <span class="icon">notifications</span>
          <span class="notif-dot"></span>
        </button>
        <button v-if="isCompact" class="header-icon-btn" @click="openDrawer">
          <span class="icon">menu</span>
        </button>
      </header>

      <div v-if="notifOpen" class="notif-dropdown">
        <div v-for="(n, ni) in notifs" :key="ni" class="notif-item">
          <span class="icon notif-icon">{{ n.icon }}</span>
          <div class="notif-text">
            <span class="notif-msg">{{ n.text }}</span>
            <span class="notif-time">{{ n.time }}</span>
          </div>
        </div>
      </div>

      <main class="main">
        <BerandaPublic v-if="showPublicHome" />
        <BerandaWarga v-if="showWargaHome" />
        <Ipl v-if="is.ipl" />
        <Warga v-if="showWargaData" />
        <Paguyuban v-if="is.paguyuban" />
        <Kegiatan v-if="is.kegiatan" />
        <Piket v-if="is.piket" />
        <Cctv v-if="is.cctv" />
        <Keluhan v-if="is.keluhan" />
        <Surat v-if="is.surat" />
        <Aset v-if="is.aset" />
        <Sosial v-if="is.sosial" />
        <AdmDash v-if="is.adm_dash" />
        <AdmIpl v-if="is.adm_ipl" />
        <AdmKeluhan v-if="is.adm_keluhan" />
        <AdmInfo v-if="is.adm_info" />
      </main>
    </div>

    <nav v-if="isCompact" class="bottom-nav">
      <button v-for="(b, bi) in bottomNav" :key="bi" class="bottom-item" :style="{ background: b.bg, color: b.fg }" @click="b.go">
        <span class="icon">{{ b.icon }}</span>
        <span class="bottom-label">{{ b.label }}</span>
      </button>
    </nav>

    <div v-if="drawerOpen" class="drawer-overlay" @click="closeDrawer">
      <div class="drawer" @click="stop">
        <div class="drawer-head">
          <img :src="logoTc" alt="Teras Country Warga" class="drawer-logo" />
          <div class="drawer-brand">
            <span class="brand-name">Teras Country</span>
            <span class="brand-sub">{{ roleLabel }}</span>
          </div>
          <button class="drawer-close icon" @click="closeDrawer">close</button>
        </div>
        <nav class="nav">
          <div v-for="(g, gi) in navGroups" :key="gi" class="nav-group">
            <span v-if="g.title" class="nav-group-title">{{ g.title }}</span>
            <button v-for="(item, ii) in g.items" :key="ii" class="nav-item drawer-nav-item" :style="{ background: item.navBg, color: item.navFg, fontWeight: item.navW }" @click="item.go">
              <span class="icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
              <span v-if="item.locked" class="icon nav-lock">lock</span>
              <span v-if="item.soon" class="nav-soon">SOON</span>
              <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
            </button>
          </div>
        </nav>
        <button v-if="isPublic" class="drawer-login" @click="openLogin">Masuk Warga</button>
        <div v-if="isLogged" class="drawer-user">
          <div class="user-avatar" :style="{ background: user.color }">{{ user.ini }}</div>
          <div class="user-info">
            <span class="user-name">{{ user.name }}</span>
            <span class="user-sub">{{ user.sub }}</span>
          </div>
          <button class="drawer-logout" @click="logout">Keluar</button>
        </div>
      </div>
    </div>

    <PayModal />
    <WargaFormModal />
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 264px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: #FFFFFF;
  border-right: 1px solid #EFE6DA;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}
.brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand-name {
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-size: 12px;
  color: #8A7563;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nav-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-group-title {
  padding: 4px 12px 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #A8927D;
  text-transform: uppercase;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
}
.nav-item:hover { background: #F7EFE5; }
.nav-item .icon { font-size: 20px; line-height: 1; }
.nav-label { flex: 1; }
.nav-lock { font-size: 16px; color: #B8A693; }
.nav-soon {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  background: #EFE8E0;
  color: #6B5848;
}
.nav-badge {
  font-size: 11px;
  font-weight: 800;
  min-width: 20px;
  padding: 2px 6px;
  border-radius: 999px;
  background: #F7702E;
  color: #fff;
  text-align: center;
}
.sidebar-cta {
  margin-top: auto;
  padding: 16px;
  border-radius: 14px;
  background: #F7EFE5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cta-title { font-size: 13px; font-weight: 700; }
.cta-desc { font-size: 12px; color: #6B5848; line-height: 1.5; }
.cta-btn {
  padding: 10px;
  border: 0;
  border-radius: 10px;
  background: #A84503;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.sidebar-user {
  margin-top: auto;
  padding: 12px;
  border-radius: 14px;
  background: #F7EFE5;
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}
.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  min-width: 0;
}
.user-name { font-size: 13px; font-weight: 700; }
.user-sub { font-size: 12px; color: #8A7563; }
.user-logout {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  color: #8A7563;
  font-size: 20px;
}
.user-logout:hover { background: #EFE3D4; }

.content-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(250, 246, 240, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #EFE6DA;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.header-title {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.header-crumb { font-size: 12px; color: #8A7563; }
.header-page { font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
.header-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  background: #2A1D14;
  color: #fff;
}
.header-login {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  background: #A84503;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.header-login .icon { font-size: 18px; }
.header-icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #EFE6DA;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2A1D14;
}
.header-icon-btn .icon { font-size: 22px; }
.notif-dot {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #F7702E;
  border: 2px solid #fff;
}

.notif-dropdown {
  position: fixed;
  top: 68px;
  right: 16px;
  z-index: 40;
  width: min(340px, calc(100vw - 32px));
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(42, 29, 20, 0.12);
  padding: 8px;
}
.notif-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
}
.notif-icon { font-size: 20px; color: #A84503; }
.notif-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.notif-msg { font-size: 13px; font-weight: 600; text-wrap: pretty; }
.notif-time { font-size: 12px; color: #8A7563; }

.main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 120px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bottom-nav {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 30;
  background: #fff;
  border: 1px solid #EFE6DA;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(42, 29, 20, 0.12);
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 6px;
}
.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  min-height: 52px;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
}
.bottom-item .icon { font-size: 22px; line-height: 1; }
.bottom-label { font-size: 11px; font-weight: 700; }

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(42, 29, 20, 0.4);
  display: flex;
  justify-content: flex-end;
}
.drawer {
  width: min(320px, 86vw);
  height: 100%;
  background: #fff;
  padding: 20px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.drawer-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}
.drawer-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.drawer-brand {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.drawer-close {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 12px;
  background: #F7EFE5;
  cursor: pointer;
  font-size: 20px;
  color: #2A1D14;
}
.drawer-nav-item {
  padding: 12px;
  min-height: 44px;
  font-size: 15px;
}
.drawer-login {
  margin-top: auto;
  padding: 14px;
  border: 0;
  border-radius: 12px;
  background: #A84503;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
.drawer-user {
  margin-top: auto;
  padding: 12px;
  border-radius: 14px;
  background: #F7EFE5;
  display: flex;
  align-items: center;
  gap: 10px;
}
.drawer-logout {
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  color: #9A3412;
  font-size: 13px;
  font-weight: 700;
}
</style>
