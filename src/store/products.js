import { defineStore } from 'pinia'
import qs from 'qs'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    apiUrl: process.env.VUE_APP_API_URL || 'https://dummyjson.com',
    data: {},
    loading: {
      fetch: false
    }
  }),

  actions: {
    async fetchData(query = {}) {
      let payload = qs.stringify(query)

      try {
        this.loading.fetch = true
        const response = await axios.get(
          `${this.apiUrl}/products/search?${payload}`
        )
        this.data = response.data
        this.loading.fetch = false
      } catch (error) {
        console.error('Error', error)
      }
    },

    deleteData(id) {
      const idx = this.data.products.findIndex((x) => {
        return x.id === id
      })

      if (idx >= 0) {
        this.data.products?.splice(idx, 1)
      }
    }
  },

  getters: {
    products() {
      return this.data.products
    },
    paging() {
      const paging = {
        limit: this.data.limit,
        skip: this.data.skip,
        total: this.data.total
      }
      return paging
    }
  }
})
