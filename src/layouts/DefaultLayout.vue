<template>
  <v-layout>
    <v-navigation-drawer>
      <SideBar />
    </v-navigation-drawer>
    <AppBar />
    <v-main>
      <v-container>
        <router-view />
        <SnackBar />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import { defineComponent } from 'vue'
import SideBar from '@/components/SideBar.vue'
import AppBar from '@/components/AppBar.vue'
import SnackBar from '@/components/SnackBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    SideBar,
    AppBar,
    SnackBar
  }
})
</script>
