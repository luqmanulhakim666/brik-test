<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Products</v-app-bar-title>

    <template v-slot:append>
      <p v-if="authStore.loggedIn">
        Welcome, {{ authStore.profile.firstName }}
      </p>
      <v-btn
        color="error"
        @click="authStore.loggedIn ? onLogout() : handleDialog()"
        >{{ authStore.loggedIn ? 'Logout' : 'Login' }}</v-btn
      >
    </template>
  </v-app-bar>

  <LoginDialogs v-model="isDialog" @close="handleDialog" />
</template>

<script setup>
import { ref } from 'vue'
import LoginDialogs from '@/components/Dialogs/LoginDialogs.vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

let isDialog = ref(false)

const handleDialog = () => {
  isDialog.value = !isDialog.value
}

const onLogout = () => {
  authStore.logout()
}
</script>
