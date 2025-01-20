<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <router-link to="/" class="logo">Note App</router-link>
    <nav>
      <template v-if="!authStore.token">
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/signup" class="nav-link">Sign Up</router-link>
      </template>
      <button v-else @click="handleLogout" class="logout-button">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
