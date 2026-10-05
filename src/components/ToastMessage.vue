<script setup>
import { usePortal } from '../composables/usePortal'
const { toast } = usePortal()
</script>

<template>
  <div v-if="toast" class="toast">{{ toast }}</div>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 96px;
  z-index: 70;
  background: #2A1D14;
  color: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 30px rgba(42, 29, 20, 0.25);
  max-width: calc(100vw - 32px);
}
</style>
