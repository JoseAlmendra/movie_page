<template>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            movies: []
        }
    },
    mounted() {
        this.getTop();
    },
    methods:{
        getTop(){
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBiOGQ5NTcxMmJmNDc1MDExNTliMzMwZjE3NWRhNSIsInN1YiI6IjY0ODIxNGQ0YmYzMWYyMDBhZWM3MTM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQNCWlqLMYjtQsnAtueRLNr0VHCM4axRqR8latathvY'  // Reemplaza YOUR_AUTH_TOKEN con tu token de autorización
                }
            };

            axios.get("https://api.themoviedb.org/3/movie/popular", config)
            .then((response) =>{
                const api_peliculas =[response.data];
                const peliculas =  api_peliculas[0].results;
                const top_pelis = peliculas.slice(0, 12);
                //this.movies = top_pelis

                this.movies = top_pelis.map(movie => ({
                    ...movie,
                    liked: false
                }));
                this.$emit('movies-updated', this.movies);
                
                console.log(this.movies)
            })
            .catch((error) =>{
                console.log(error);
            })
        }
    }
}
</script>