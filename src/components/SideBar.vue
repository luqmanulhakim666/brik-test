<template>
  <v-list density="compact" nav>
    <v-list-item
      link
      v-for="(menu, index) in menus"
      :key="index"
      :to="menu.path"
      :prepend-icon="menu.icon"
      :title="menu.title"
    ></v-list-item>
  </v-list>
</template>

<script setup>
import { ref } from 'vue'
import { MENUS } from '../data/menus'

const menus = ref(MENUS)
</script>
