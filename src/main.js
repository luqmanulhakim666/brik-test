import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import router from '@/router'
import axiosPlugin from '@/plugins/axios'
import authPlugin from '@/plugins/auth'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'
import SnackBar from '@/components/SnackBar.vue'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

app.config.globalProperties.$darkMode = true

const vuetify = createVuetify({
  components,
  directives
})

const libraries = [router, vuetify, createPinia(), authPlugin, axiosPlugin]
libraries.map((it) => {
  app.use(it)
})

app.component('SnackBar', SnackBar)
app.mount('#app')
