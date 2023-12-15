// snackbarStore.js
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore({
  id: 'snackbar',
  state: () => ({
    show: false,
    message: '',
    timeout: 6000,
    color: 'success'
  }),
  actions: {
    showSnackbar({ message, timeout, color }) {
      this.show = true
      this.message = message
      this.timeout = timeout || 6000
      this.color = color || 'success'
    },
    closeSnackbar() {
      this.show = false
    }
  }
})
