<template @opened="getData">
    <v-dialog 
        v-model="dialogVisible"
        transition="dialog-top-transition"
        width="auto"
        @opened="getData"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title>
              <h1>{{ movie.title }} - {{ movieDetails.tagline }}</h1>
            </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4">
                    <img :src="'https://image.tmdb.org/t/p/original' + movie.poster_path" alt="Movie Poster" style="width: 100%;"/>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-card-text>
                        <v-progress-linear
                          :model-value="(movieDetails.vote_average)*10"
                          color="light-green-darken-4"
                          height="25"
                          style="border-radius: 10px; margin-bottom: 3%;"
                          striped
                        >
                          <template v-slot="{ value }">
                            <strong style="color: #FFFFFF;">{{ value }}%</strong>
                          </template>
                        </v-progress-linear>
                      <p class="text-subtitle-1" style="float: left; margin-right: 50%;">calificacion: {{ movieDetails.vote_average }}</p>
                      <p class="text-subtitle-1" >votos totales: {{ movieDetails.vote_count }}</p>
                      <p class="text-subtitle-1">Fecha de lanzamiento: {{ movie.release_date }}</p>
                      <p class="text-subtitle-1">Popularidad: {{ movie.popularity }}</p>
                      <p class="text-subtitle-1" style="float: left; margin-right: 15px;" >Generos:  </p>
                      <p class="text-subtitle-1" v-for="(movies,index) in movieDetails.genres" key="movieDetails.genres.id" style="float: left; "> {{ movies.name }}{{ (index !== movieDetails.genres.length - 1) ? ' , ' : '' }} </p>
                      <br><br>
                      <p class="text-subtitle-1" style="float: left; margin-right: 15px;"> compañias productoras: </p>
                      <p class="text-subtitle-1" v-for="(movies,index) in movieDetails.production_companies" key="movieDetails.production_companies.id" style="float: left;"> {{ movies.name }}{{ (index !== movieDetails.production_companies.length - 1) ? ' , ' : '' }} </p>
                      <br><br>
                      <p class="text-subtitle-1" style="float: left; margin-right: 15px;"> lenguajes: </p>
                      <p class="text-subtitle-1" v-for="(movies,index) in movieDetails.spoken_languages" key="movieDetails.spoken_languages.id" style="float: left;"> {{ movies.name }}{{ (index !== movieDetails.spoken_languages.length - 1) ? ' , ' : '' }} </p>
                      <br><br>
                      <p class="text-h5" style="margin-top: 5%;">Overview: </p>
                      <p class="text-h5">{{ movieDetails.overview }}</p>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
          </v-card>
        </template>
      </v-dialog>
  </template>
  
<script>
  import axios from 'axios'
  export default {
    props: {
      movie: Object  // Propiedad para recibir los datos de la película seleccionada
    },
    data() {
      return {
        dialogVisible: false,  // Variable para controlar la visibilidad del modal dialog
        movieDetails: [] //objeto donde se guarda la informacion consultada en el api
      };
    },
    watch: {
     movie: {
         immediate: true,
         handler() {
           this.getData(); 
         }
       }
    },
    methods:{
      async getData(){
        const config = {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBiOGQ5NTcxMmJmNDc1MDExNTliMzMwZjE3NWRhNSIsInN1YiI6IjY0ODIxNGQ0YmYzMWYyMDBhZWM3MTM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQNCWlqLMYjtQsnAtueRLNr0VHCM4axRqR8latathvY'  // Reemplaza YOUR_AUTH_TOKEN con tu token de autorización
          }
        };

        try{ //se realiza la consulta de las peliculas al api ttps://api.themoviedb.org/3/movie/{movie.id}
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movie.id}`, config);
          this.movieDetails = response.data;
        }catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>