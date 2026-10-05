<script setup>
import { onMounted, onUnmounted } from 'vue'
import { usePortal } from './composables/usePortal'
import LoginScreen from './components/LoginScreen.vue'
import AppShell from './components/AppShell.vue'
import ToastMessage from './components/ToastMessage.vue'

const { showLogin, showApp, initApp, teardownApp } = usePortal()

onMounted(() => initApp('public'))
onUnmounted(() => teardownApp())
</script>

<template>
  <div class="root">
    <LoginScreen v-if="showLogin" />
    <AppShell v-if="showApp" />
    <ToastMessage />
  </div>
</template>

<style scoped>
.root {
  min-height: 100vh;
  background: #FAF6F0;
}
</style>
