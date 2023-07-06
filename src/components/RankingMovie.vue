<template>
  <div class="star-rating">
    <v-rating
      :model-value="userStore.ifExistRanking(props.movieId) ? userStore.ifExistRanking(props.movieId) : props.modelValue"
      @update:modelValue="postRank($event)"
      :color="
        userStore.ifExistRanking(props.movieId)
          ? 'orange-darken-4'
          : 'yellow-darken-3'
      "
      background-color="grey darken-1"
      
      half-increments
    ></v-rating>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

//import {ref} from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
  },
  movieId: {
    type: Number,
  },
})

const ranking = ref(props.modelValue)


const estrellas = userStore.ifExistRanking(props.movieId)
if (estrellas !== null) {
  ranking.value = estrellas
}

const postRank = async (number) => {
  userStore.addRanking(number, props.movieId)
  console.log(number + ' - ' + props.movieId)
}
</script>
