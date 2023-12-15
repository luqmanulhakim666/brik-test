<!-- GlobalSnackbar.vue -->
<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="color" top>
    {{ message }}
  </v-snackbar>
</template>

<script>
import { ref, watch } from 'vue'
import { useSnackbarStore } from '@/store/snackbar'

export default {
  setup() {
    const store = useSnackbarStore()
    const show = ref(store.show)
    const message = ref(store.message)
    const timeout = ref(store.timeout)
    const color = ref(store.color)

    watch(
      () => store.show,
      (newShow) => (show.value = newShow)
    )
    watch(
      () => store.message,
      (newMessage) => (message.value = newMessage)
    )
    watch(
      () => store.timeout,
      (newTimeout) => (timeout.value = newTimeout)
    )
    watch(
      () => store.color,
      (newColor) => (color.value = newColor)
    )

    return {
      show,
      message,
      timeout,
      color
    }
  }
}
</script>
