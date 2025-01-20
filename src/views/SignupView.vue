<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

async function handleSignup() {
  try {
    await authStore.signup(username.value, email.value, password.value)
    await authStore.login(email.value, password.value)
    router.push('/notes')
  } catch (err: unknown) {
    error.value = ((err as { response?: { data?: { message?: string } } }).response?.data?.message) || 'Signup failed. Please try again.'
  }
}
</script>

<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup" class="signup-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Sign Up</button>
      <div class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.signup-form {
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

.login-link {
  text-align: center;
  margin-top: 1rem;
}
</style>
