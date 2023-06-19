<template>
  <v-app id="inspire">
    <!-- Barra de navegación -->
    <v-app-bar dark extension-height="100%">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h2>Peliculas</h2>
      </v-toolbar-title>
      <!-- Componente de ordenamiento -->
      <movie-sorting @sort-selected="handleSort"></movie-sorting>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Mostrar películas -->
          <v-col v-for="movie in filteredMovies" :key="movie.id" cols="4">
            <h3>{{ movie.title }}</h3>
            <v-card height="600" style="background-color: aqua;">
              <img :src="'https://image.tmdb.org/t/p/original' + movie.poster_path" alt="Movie Poster" @click="openMovieDialog(movie)" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Componente de diálogo de película -->
    <movie-dialog :movie="selectedMovie" ref="movieDialog" />

    <!-- Componente de lista de películas -->
    <movie-list @movies-updated="updateMovies" />
  </v-app>
</template>

<script>
import MovieList from './movieList.vue';
import MovieSorting from './movieSorting.vue';
import MovieDialog from './movieDialog.vue';

export default {
  components: {
    MovieList,
    MovieSorting,
    MovieDialog
  },
  data() {
    return {
      movies: [],
      selectedMovie: null,
      favoriteOptionSelected: false
    }
  },
  computed: {
    filteredMovies() {
      // Filtrar las películas según la opción de ordenamiento seleccionada
      if (this.favoriteOptionSelected) {
        // Filtrar por favoritos
        return this.movies.filter(movie => movie.liked);
      } else {
        // Mostrar todas las películas
        return this.movies;
      }
    }
  },
  methods: {
    updateMovies(movies) {
      // Función para manejar el evento y actualizar la propiedad 'movies'
      this.movies = movies;
    },
    handleSort(option) {
      // Función para manejar la opción de ordenamiento seleccionada
      if (option === 'Option 4') {
        // Si se selecciona "favoritos"
        this.favoriteOptionSelected = true;
      } else {
        // Si se selecciona otra opción de ordenamiento
        this.favoriteOptionSelected = false;

        // Ordenar las películas según la opción seleccionada
        if (option === 'Option 1') {
          // Ordenar por fecha
          this.movies.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
          });
        } else if (option === 'Option 2') {
          // Ordenar alfabéticamente por título
          this.movies.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (option === 'Option 3') {
          // Ordenar por popularidad
          this.movies.sort((a, b) => {
            return b.popularity - a.popularity;
          });
        }
      }
    },
    openMovieDialog(movie) {
      // Abrir el diálogo de la película seleccionada
      this.selectedMovie = movie;
      this.$refs.movieDialog.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
