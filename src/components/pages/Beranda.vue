<script setup>
import { usePortal } from '../../composables/usePortal'
import BerandaPublic from './BerandaPublic.vue'
import BerandaWarga from './BerandaWarga.vue'

const { isPublic } = usePortal()
</script>

<template>
  <BerandaPublic v-if="isPublic" />
  <BerandaWarga v-else />
</template>
