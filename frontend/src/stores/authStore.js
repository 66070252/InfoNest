import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  function setUserAndToken(userData, newToken) {
    user.value = userData
    token.value = newToken
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login';
  }

  return { token, user, isLoggedIn, setUserAndToken, logout }
})