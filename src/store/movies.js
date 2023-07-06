import { defineStore } from "pinia";
import axios from 'axios';
import { useUserStore } from "./user"

export const useMoviesStore = defineStore("moviesStore", {
    // data reactiva
    state: () => ({
        movies: [],
        orderOption: ""
    }),
    getters: {
        getMovies(){
           //const movies = this.movies.map((movie) => movie)
           const movies = JSON.parse(JSON.stringify(this.movies));
           
            const userStore = useUserStore()
           movies.filter((movie) => movie.vote_count = Math.ceil(movie.vote_count/100))

           //checa si recibio calificacion del usuario y lo añade al average y al count
           const ifMovieRankingExist = ({id}) =>{
            return id in userStore.ranking
           }
           movies.filter((movie) => {
            
            if( ifMovieRankingExist(movie)){
                
                movie.vote_count = (movie.vote_count + 1)
                
                movie.vote_average = ((movie.vote_average * movie.vote_count ) + (userStore.ranking[movie.id].numStars*2)) / (movie.vote_count + 1)
                
                //movie.vote_average = Number(movie.vote_average.toFixed(2))
            }

           })

           if(this.orderOption === "1"){
            movies.sort((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date);
            });
           }else if(this.orderOption === "2"){
            movies.sort((a, b) => {
                return a.title.localeCompare(b.title);
              });
           }else if(this.orderOption === "3"){
            movies.sort((a, b) => {
                return b.popularity - a.popularity;
            });
           }else if(this.orderOption === "4"){
                return movies.filter((movie) => {
                    userStore.favorites.includes(movie.id)
                })
           }else if(this.orderOption === "5"){
            movies.filter((movie) => {
                if(ifMovieRankingExist(movie)){
                    movie.vote_average = userStore.ranking(movie.id)*2
                }
            })
            movies.sort((a,b) =>{
                return b.vote_average/2 - a.vote_average/2
            })
           }
           return movies
        }
    },
    // methods
    actions: {
        async fetchMovies() {
            // const userStore = useUserStore()
            try{
                const config = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBiOGQ5NTcxMmJmNDc1MDExNTliMzMwZjE3NWRhNSIsInN1YiI6IjY0ODIxNGQ0YmYzMWYyMDBhZWM3MTM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQNCWlqLMYjtQsnAtueRLNr0VHCM4axRqR8latathvY'  // Reemplaza YOUR_AUTH_TOKEN con tu token de autorización
                    }
                };

                const response = await axios.get("https://api.themoviedb.org/3/movie/popular", config);
                const api_peliculas = [response.data];
                const peliculas = api_peliculas[0].results;
                const top_pelis = peliculas.slice(0, 12);
                // top_pelis.filter((movie) => {
                //     if (userStore.ifExistRanking(movie.id)!==null) { 
                //         movie.vote_average = userStore.ifExistRanking(movie.id)*2
                //     }
                // })
                this.movies = top_pelis;
            }catch (error) {
                console.error('Error al obtener las películas:', error);
            }
        }
    }
});