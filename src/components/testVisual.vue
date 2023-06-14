<template>
    <v-app id="inspire">
      <v-app-bar dark extension-height="100%">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>
          <h2>Peliculas</h2>
        </v-toolbar-title>
        <movie-sorting @sort-selected="handleSort"></movie-sorting>
      </v-app-bar>
      
      <v-main>
        <v-container>
          <v-row>
            <v-col v-for="movie in movies" :key="movie.id" cols="4" >
              <h3>{{ movie.title }}</h3>
              <v-card height="600"  style="background-color: aqua;">
                <img :src="'https://image.tmdb.org/t/p/original' + movie.poster_path" alt="Movie Poster" @click="openMovieDialog(movie)"/>
                
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <movie-dialog :movie="selectedMovie" ref="movieDialog" />
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
      selectedMovie: null
    }
  },
  methods: {
    updateMovies(movies) { // Función para manejar el evento y actualizar la propiedad 'movies'
      this.movies = movies;
    },
    handleSort(option){
      if (option === 'Option 1') { // Ordenar por fecha
        this.movies.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });
      } else if (option === 'Option 2') { // Ordenar alfabéticamente por título
        this.movies.sort((a, b) => { // Realiza la comparación de los títulos de las películas
        return a.title.localeCompare(b.title);
        });
      } else if (option === 'Option 3') { // Ordenar por popularidad
        this.movies.sort((a, b) => { // Realiza la comparación de las calificaciones de popularidad
          return b.popularity - a.popularity;
        });
      }
    },
    openMovieDialog(movie) {
      this.selectedMovie = movie;  // Establecer la película seleccionada
      this.$refs.movieDialog.dialogVisible = true;  // Abrir el modal dialog
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