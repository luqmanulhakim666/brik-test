<template>
  <div>
    <h2 class="mt-2 mb-6">{{ title }}</h2>
    <v-text-field v-model="form.title" label="Title" variant="outlined" />
    <v-text-field v-model="form.price" label="Price" variant="outlined" />
    <v-text-field v-model="form.stock" label="Stock" variant="outlined" />
    <v-text-field
      v-model="form.category"
      label="Category "
      variant="outlined"
    />
    <v-textarea
      v-model="form.description"
      label="Description"
      variant="outlined"
    />

    <div class="d-flex justify-end">
      <v-btn class="text-capitalize" to="/">Back</v-btn>
      <v-btn class="ml-4 text-capitalize" color="error" @click="onSave()"
        >Save</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbarStore } from '@/store/snackbar'
import axios from 'axios'

const form = ref({
  title: '',
  price: '',
  stock: 0,
  category: '',
  description: ''
})
let title = ref('')

const apiUrl = process.env.VUE_APP_API_URL || 'https://dummyjson.com'
const route = useRoute()
const router = useRouter()
const useSnackBar = useSnackbarStore()
const id = route.params.slug

const getOne = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/${id}`)
    form.value = response.data
    title = response.data.title
  } catch (error) {
    console.error('Error', error)
  }
}

const isCreated = computed(() => {
  return id === 'create'
})

const onSave = async () => {
  try {
    const api = isCreated.value
      ? axios.post(`${apiUrl}/products/add`, JSON.stringify(form.value))
      : axios.put(`${apiUrl}/products/${id}`, JSON.stringify(form.value))
    await api
    useSnackBar.showSnackbar({
      message: 'Data has been saved',
      timeout: 5000,
      color: 'success'
    })
    router.push('/')
  } catch (error) {
    useSnackBar.showSnackbar({
      message: error.response.data.message,
      timeout: 5000,
      color: 'error'
    })
  }
}

onMounted(() => {
  console.log(isCreated.value)
  if (!isCreated.value) {
    getOne()
  }
})
</script>
