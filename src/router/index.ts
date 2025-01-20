import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import NotesView from '@/views/NotesView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Redirect to notes if trying to access login/signup while already authenticated
  if ((to.name === 'login' || to.name === 'signup') && authStore.token) {
    return { name: 'notes' }
  }

  // Redirect to login if trying to access protected route while not authenticated
  if (to.meta.requiresAuth && !authStore.token) {
    return { name: 'login' }
  }
})

export default router
