<template>
    <!-- <v-dialog v-model="dialogVisible" transition="dialog-top-transition" width="auto">
      <v-card>
         Contenido del modal dialog 
        <v-card-title>LOL</v-card-title>
        
        <v-card-text>
          <p>pene</p>
        </v-card-text>
        <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialogVisible"
        transition="dialog-top-transition"
        width="auto"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              :title="`${movie.title}`"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-3">
                <p>Fecha de lanzamiento: {{ movie.release_date }}</p>
                <p>Popularidad: {{ movie.popularity }}</p>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </template>
  
<script>
  export default {
    props: {
      movie: Object  // Propiedad para recibir los datos de la película seleccionada
    },
    data() {
      return {
        dialogVisible: false  // Variable para controlar la visibilidad del modal dialog
      };
    }
  };
</script>