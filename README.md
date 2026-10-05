# terascountry_warga
portal single platform untuk informasi warga teras country residence

## Tech stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vitejs.dev/) sebagai build tool & dev server
- JavaScript murni (tanpa TypeScript)
- Styling inline/CSS murni per komponen (tanpa library UI/komponen pihak ketiga), mengikuti palet warna & font asli (Plus Jakarta Sans + Material Symbols Rounded)
- State management sederhana lewat satu composable (`src/composables/usePortal.js`) berbasis `reactive()` + `computed()` milik Vue — tanpa Vuex/Pinia/vue-router, karena aplikasi ini adalah single-page "screen switcher" yang murni digerakkan oleh state

## Cara install

```bash
npm install
```

## Cara jalanin (development)

```bash
npm run dev
```

Lalu buka URL yang ditampilkan di terminal (default `http://localhost:5173`).

## Cara build (production)

```bash
npm run build
```

Hasil build akan ada di folder `dist/`. Untuk preview hasil build secara lokal:

```bash
npm run preview
```

## Struktur folder singkat

```
src/
  assets/              gambar/logo (logo-tc.png, LogoWargaTC-New.png)
  composables/
    usePortal.js       seluruh state, data mock, dan logic aplikasi (role, login, IPL, warga, kegiatan, keluhan, admin, dll)
  components/
    LoginScreen.vue    layar login (tab warga/pengurus + isi otomatis akun demo)
    AppShell.vue       kerangka aplikasi: sidebar, header, drawer, bottom nav, notifikasi
    ToastMessage.vue   komponen toast/flash message
    PayModal.vue       modal pembayaran IPL
    pages/             satu komponen per halaman portal (Beranda, IPL, Warga, Paguyuban,
                       Kegiatan, Piket, CCTV, Keluhan, Surat, Aset, Sosial, dan halaman
                       Admin: Dashboard, IPL, Keluhan, Pengumuman)
  App.vue              root komponen (switch antara layar login & app shell)
  main.js              entry point
index.html             HTML shell + font Google Fonts
vite.config.js         konfigurasi Vite + plugin Vue
```

Catatan: aplikasi ini tidak memakai `vue-router` — navigasi antar "halaman" dilakukan murni
lewat state reaktif (`state.page`, `state.screen`) di dalam `usePortal.js`, meniru perilaku
prototipe aslinya.
