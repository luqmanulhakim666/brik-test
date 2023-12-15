import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useSnackbarStore } from '@/store/snackbar.js'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    apiUrl: process.env.VUE_APP_API_URL || 'https://dummyjson.com',
    loggedIn: localStorage.getItem('token') ? true : false,
    profile: null,
    isLoading: false,
    router: useRouter(),
    useSnackBar: useSnackbarStore()
  }),

  actions: {
    async login(credentials) {
      try {
        this.isLoading = true

        const response = await axios.post(
          `${this.apiUrl}/auth/login`,
          credentials
        )

        if (response) {
          const token = `Bearer ${response.data.token}`
          localStorage.setItem('token', token)
          localStorage.setItem('profile', JSON.stringify(response.data))
          axios.defaults.headers.common['Authorization'] = token
          this.fetchUser()
        }
        this.isLoading = false
      } catch (error) {
        this.useSnackBar.showSnackbar({
          message: error.response.data.message,
          timeout: 5000,
          color: 'error'
        })
        this.isLoading = false
      }
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('profile')
      this.router.push('/')
      this.$reset()
    },

    async fetchUser() {
      this.profile = JSON.parse(localStorage.getItem('profile'))
      this.loggedIn = true
    }
  }
})
