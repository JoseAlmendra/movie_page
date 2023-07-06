import { defineStore } from 'pinia';
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movieId: null,
    movie : [],
  }),
  actions: {
    async getMovieId(movieID) {
      this.movieId = movieID;
    },
    async getMovieDetails(){
        const config = {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBiOGQ5NTcxMmJmNDc1MDExNTliMzMwZjE3NWRhNSIsInN1YiI6IjY0ODIxNGQ0YmYzMWYyMDBhZWM3MTM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQNCWlqLMYjtQsnAtueRLNr0VHCM4axRqR8latathvY'  // Reemplaza YOUR_AUTH_TOKEN con tu token de autorización
            }
        };
        try{ //se realiza la consulta de las peliculas al api ttps://api.themoviedb.org/3/movie/{movie.id}
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}`, config);
            this.movie = response.data;
        }catch (error) {
            console.log(error);
        }

    }
  }
});