// src/store/authStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  // Initialize axios header if token exists
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  // Watch token changes and update localStorage
  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  })

  async function signup(username: string, email: string, password: string) {
    try {
      await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      })
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Signup failed')
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })
      token.value = response.data.token
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Login failed')
    }
  }

  function logout() {
    token.value = null
  }

  return {
    token,
    signup,
    login,
    logout,
  }
})
