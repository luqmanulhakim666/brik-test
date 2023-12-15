import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import HomePage from './pages/HomePage.vue'
import ProductDetail from './pages/products/_slug.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: '/products/:slug',
        name: 'Detail',
        component: ProductDetail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
