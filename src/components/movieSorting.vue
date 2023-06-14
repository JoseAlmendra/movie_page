<template>
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
              ordenar
        </v-btn>
      </template>

  
      <v-list>
        <v-list-item @click="handleOption('Option 1')">
          <v-list-item-title>fecha</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleOption('Option 2')">
          <v-list-item-title>a-z</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleOption('Option 3')">
          <v-list-item-title>popularidad</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  
<script>
  export default {
    data() {
      return {
        selectedOption: "Sort by"
      };
    },
    methods: {
      handleOption(option) {
        this.selectedOption = option;
        this.$emit("sort-selected", option);
        console.log(this.selectedOption);
      }
    }
  };
</script>