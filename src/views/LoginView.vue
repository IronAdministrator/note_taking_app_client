<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value)
    if (authStore.token) {
      router.push('/notes')
    }
  } catch (err: unknown) {
    error.value = ((err as { response?: { data?: { message?: string } } }).response?.data?.message) || 'Invalid credentials'
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
      <div class="signup-link">
        Don't have an account? <router-link to="/signup">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.signup-link {
  text-align: center;
  margin-top: 1rem;
}
</style>
