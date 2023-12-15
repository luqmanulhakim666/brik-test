<template>
  <div>
    <v-text-field
      v-model="body.q"
      variant="outlined"
      placeholder="Search Here..."
      @input="onSearch"
    />

    <v-btn
      v-if="authStore.loggedIn"
      to="/products/create"
      class="text-capitalize mb-4"
      color="error"
    >
      <v-icon>mdi-plus</v-icon>
      Add New Product
    </v-btn>

    <v-card class="py-6 rounded-md">
      <v-data-table
        :headers="headers"
        :items="productsStore.products"
        item-key="name"
        :loading="loading.fetch"
      >
        <template #bottom></template>
        <template v-slot:[`item.price`]="{ item }">
          ${{ decimal(item.price) }}
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div v-if="authStore.loggedIn">
            <v-btn size="small" icon flat :to="`/products/${item.id}`"
              ><v-icon color="primary">mdi-pencil</v-icon></v-btn
            >
            <v-btn size="small" icon flat @click="onDelete(item.id)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <div class="d-flex justify-end">
      <v-pagination
        v-model="body.skip"
        rounded="circle"
        color="error"
        class="my-4"
        total-visible="4"
        :length="totalPage"
        @input="onChangePagination"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/store/products'
import { useAuthStore } from '@/store/auth'
import { usePipe } from '@/mixins/pipe'
import debounce from 'lodash/debounce'

const productsStore = useProductStore()
const authStore = useAuthStore()
const loading = productsStore.loading
const { decimal } = usePipe()

const body = ref({
  q: '',
  limit: 10,
  skip: 0
})
const headers = ref([
  { title: 'Title', value: 'title' },
  { title: 'Stock', value: 'stock' },
  { title: 'Category', value: 'category' },
  { title: 'Price', value: 'price' },
  { title: 'Actions', value: 'action' }
])
const onSearch = debounce(() => {
  body.value.skip = 1
  fetchProduct()
}, 500)

const onChangePagination = () => {
  fetchProduct()
}

const onDelete = (id) => {
  productsStore.deleteData(id)
}

const totalPage = computed(() => {
  return Math.ceil(productsStore.paging?.total / body.value.limit) || 0
})

const fetchProduct = () => {
  productsStore.fetchData(body.value)
}

onMounted(() => {
  fetchProduct()
})

watch(
  () => body.value.skip,
  () => {
    fetchProduct()
  }
)
</script>
