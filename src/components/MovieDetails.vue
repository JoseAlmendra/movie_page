<template>
  <div>
    <!-- <div>
      <p>id guardado en MovieStore: {{ movieId }}</p>
      <v-btn @click="handleClick">detalles</v-btn>
      <h1 v-if="UserStore.isFavorite(movieId)">es favorito</h1>
      <h1 v-else>no es favorito</h1>
      <p>{{ movie.overview }}</p>
      <v-btn v-if="movie.overview" @click="buttonFunction(movie)">agregar favoitos</v-btn>  
    </div> -->

    <v-dialog
      :model-value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      transition="dialog-top-transition"
      width="auto"
    >
      <template v-slot:default="{}">
        <v-card class="pa-5 ma-15">
          <v-card-title>
            <div class="text-h4">{{ movie.title }} - {{ movie.tagline }}</div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <img
                  :src="
                    'https://image.tmdb.org/t/p/original' + movie.poster_path
                  "
                  alt="Movie Poster"
                  style="width: 100%"
                />
              </v-col>
              <v-col cols="12" sm="8">
                <v-card-text>
                  <div class="progress-heart-container">
                    <v-progress-linear
                      :model-value="movie.vote_average * 10"
                      color="light-green-darken-4"
                      height="25"
                      style="border-radius: 10px; margin-bottom: 3%"
                      class="custom-progress-bar"
                      striped
                    >
                      <template v-slot="{ value }">
                        <strong style="color: #ffffff"
                          >{{ value.toFixed(2) }}%</strong
                        >
                      </template>
                    </v-progress-linear>
                    <v-btn icon @click="Favorite(movie.id)" class="heart-icon" size="60">
                      <v-icon
                        :class="{
                          'red-heart': UserStore.isFavorite(movieId),
                        }"
                        size="35"
                        >mdi-heart</v-icon
                      >
                    </v-btn>
                  </div>
                  <p
                    class="text-subtitle-1"
                    style="float: left; margin-right: 50%"
                  >
                    calificacion: {{ movie.vote_average }}
                  </p>
                  <p class="text-subtitle-1">
                    votos totales: {{ movie.vote_count }}
                  </p>
                  <p class="text-subtitle-1">
                    Fecha de lanzamiento: {{ movie.release_date }}
                  </p>
                  <!-- <p class="text-subtitle-1">
                    Popularidad: {{ movie.popularity }}
                  </p> -->
                  <p
                    class="text-subtitle-1"
                    style="float: left; margin-right: 15px"
                  >
                    Generos:
                  </p>
                  <p
                    class="text-subtitle-1"
                    v-for="(genre, index) in movie.genres"
                    :key="genre.id"
                    style="float: left"
                  >
                    {{ genre.name }}
                    {{ index !== movie.genres.length - 1 ? ' , ' : '' }}
                  </p>
                  <br /><br />
                  <p
                    class="text-subtitle-1"
                    style="float: left; margin-right: 15px"
                  >
                    compañias productoras:
                  </p>
                  <p
                    class="text-subtitle-1"
                    v-for="(production, index) in movie.production_companies"
                    :key="production.id"
                    style="float: left"
                  >
                    {{ production.name }}
                    {{
                      index !== movie.production_companies.length - 1 ? ' , ' : ''
                    }}
                  </p>
                  <br /><br />
                  <p
                    class="text-subtitle-1"
                    style="float: left; margin-right: 15px"
                  >
                    lenguajes:
                  </p>
                  <p
                    class="text-subtitle-1"
                    v-for="(language, index) in movie.spoken_languages"
                    :key="language.id"
                    style="float: left"
                  >
                    {{ language.name }}

                    {{
                      index !== movie.spoken_languages.length - 1 ? ' , ' : ''
                    }}
                  </p>
                  <br /><br />
                  <p class="text-h5" style="margin-top: 5%">Overview:</p>
                  <p class="text-h5">{{ movie.overview }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovieStore } from '../store/movie'
import { useUserStore } from '../store/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const UserStore = useUserStore()

const { movie, movieId } = storeToRefs(useMovieStore())

const Favorite = async (movieId) => {
  UserStore.addFavorite(movieId)
}

</script>

<style>
.custom-progress-bar {
  width: 100%; /* Ajusta el ancho de la barra de progreso */
}

.progress-heart-container {
  display: flex;
  align-items: center;
}

.heart-icon {
  margin-left: 0%;
  margin-bottom: 3%;
  color: gray;
}

.red-heart {
  color: red;
}
</style>
