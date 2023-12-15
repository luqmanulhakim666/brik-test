import { useAuthStore } from '@/store/auth'

export default {
  install: (app) => {
    app.config.globalProperties.$auth = useAuthStore()

    if (useAuthStore().loggedIn) {
      useAuthStore().fetchUser()
    }
  }
}
