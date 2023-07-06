<template>
  <v-app id="inspire">
    <!-- Barra de navegación -->
    <v-app-bar dark extension-height="100%">
      <v-toolbar-title>
        <h2>Peliculas</h2>
      </v-toolbar-title>
      <!-- <input :model-value="text" style="background-color: bisque;" @input="text = ($event.target.value)"> -->
      <!-- <input v-model="text" style="background-color: bisque;"> -->
      <!-- Componente de ordenamiento -->
      <movie-sorting></movie-sorting>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <!-- Mostrar películas -->
          <v-col
            v-for="movie in useGetMovie.getMovies"
            :key="movie.id"
            cols="4"
          >
            <v-card
              height="100%"
              style="background-color: rgb(255, 255, 255)"
              :title="movie.title"
              class="elevation-0 justify-center mt-auto"
            >
              <div class="d-flex align-center flex-column my-auto">
                <img
                  :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
                  alt="Movie Poster"
                  @click="openMovieDialog(movie)"
                />
                <ranking-movie :model-value="movie.vote_average/2" :movie-id="movie.id"></ranking-movie>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div v-if="GenerateDialog">
      <movie-details v-model="MovieDialog"></movie-details>
    </div>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMoviesStore } from '../store/movies'
import { useMovieStore } from '../store/movie'
import MovieDetails from './MovieDetails.vue'
import MovieSorting from './MovieSorting.vue'
import RankingMovie from './RankingMovie.vue'
const useGetMovie = useMoviesStore()
const movieStore = useMovieStore()

const { fetchMovies } = useGetMovie

const MovieDialog = ref(false)
const GenerateDialog = ref(false)
//const text = ref(null)

onMounted(async () => {
  await fetchMovies()
})

const openMovieDialog = async (movie) => {
  GenerateDialog.value = false
  await movieStore.getMovieId(movie.id)
  await movieStore.getMovieDetails()
  MovieDialog.value = true
  GenerateDialog.value = true
}

</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
}
.cardColor {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
}
</style>
