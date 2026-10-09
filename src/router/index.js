import { createRouter, createWebHistory } from 'vue-router'

// meta.auth  → wajib login (warga atau pengurus); satu-satunya sumber daftar menu terkunci
// meta.admin → khusus pengurus
const page = name => () => import(`../components/pages/${name}.vue`)

export const routes = [
  { path: '/', name: 'beranda', component: page('Beranda'), meta: { title: 'Beranda' } },
  { path: '/login', name: 'login', component: { render: () => null }, meta: { title: 'Masuk' } },

  { path: '/ipl', name: 'ipl', component: page('Ipl') },
  { path: '/keuangan', name: 'keuangan', component: page('Keuangan') },
  { path: '/warga', name: 'warga', component: page('Warga'), meta: { auth: true } },
  { path: '/paguyuban', name: 'paguyuban', component: page('Paguyuban') },
  { path: '/kegiatan', name: 'kegiatan', component: page('Kegiatan') },
  { path: '/piket', name: 'piket', component: page('Piket') },
  { path: '/cctv', name: 'cctv', component: page('Cctv') },
  { path: '/keluhan', name: 'keluhan', component: page('Keluhan') },
  { path: '/surat', name: 'surat', component: page('Surat') },
  { path: '/aset', name: 'aset', component: page('Aset') },
  { path: '/sosial', name: 'sosial', component: page('Sosial') },
  { path: '/faq', name: 'faq', component: page('Faq') },
  { path: '/profil', name: 'profil', component: page('Profil'), meta: { auth: true } },

  { path: '/admin', name: 'adm_dash', component: page('AdmDash'), meta: { auth: true, admin: true } },
  { path: '/admin/ipl', name: 'adm_ipl', component: page('AdmIpl'), meta: { auth: true, admin: true } },
  { path: '/admin/keluhan', name: 'adm_keluhan', component: page('AdmKeluhan'), meta: { auth: true, admin: true } },
  { path: '/admin/warga', name: 'adm_warga', component: page('Warga'), meta: { auth: true, admin: true } },
  { path: '/admin/paguyuban', name: 'adm_paguyuban', component: page('AdmPaguyuban'), meta: { auth: true, admin: true } },
  { path: '/admin/pengumuman', name: 'adm_info', component: page('AdmInfo'), meta: { auth: true, admin: true } },

  { path: '/:pathMatch(.*)*', redirect: { name: 'beranda' } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
