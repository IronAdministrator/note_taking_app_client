<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="app">
    <HeaderComponent />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
