<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> ordenar </v-btn>
    </template>
    <v-list>
      <v-list-item @click="handleOption('1')">
        <v-list-item-title>fecha</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleOption('2')">
        <v-list-item-title>a-z</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleOption('3')">
        <v-list-item-title>popularidad</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleOption('4')">
        <v-list-item-title>favoritos</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleOption('5')">
        <v-list-item-title>ranking</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useMoviesStore } from '../store/movies'

const moviesStore = useMoviesStore()

const handleOption = (option) => {
  console.log(option)
  moviesStore.orderOption = option
}
</script>
