<template>
  <v-dialog width="500" persistent>
    <v-card class="white pa-6">
      <div class="d-flex">
        <v-icon color="grey mr-4">mdi-account</v-icon>
        <h3>Login</h3>
      </div>
      <v-divider class="my-4" />
      <v-text-field
        variant="outlined"
        v-model="form.username"
        label="Username"
      />
      <v-text-field
        variant="outlined"
        v-model="form.password"
        type="password"
        label="Password"
      />

      <div class="d-flex justify-end">
        <v-btn
          class="text-capitalize"
          :disabled="authStore.isLoading"
          @click="closeDialog()"
          >Back</v-btn
        >
        <v-btn
          class="ml-4 text-capitalize"
          color="error"
          :loading="authStore.isLoading"
          @click="onLogin()"
          >Login</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.js'

export default {
  setup(props, context) {
    const authStore = useAuthStore()

    const form = ref({
      username: 'kminchelle',
      password: '0lelplR'
    })

    const onLogin = async () => {
      await authStore.login(form.value)
      context.emit('close')
    }

    const closeDialog = () => {
      context.emit('close')
      form.value = {
        username: '',
        password: ''
      }
    }

    return {
      onLogin,
      closeDialog,
      form,
      authStore
    }
  }
}
</script>
