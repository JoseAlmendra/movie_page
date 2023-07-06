import {defineStore} from "pinia";

export const useUserStore = defineStore("user",{
    state: () => ({
        favorites: [],  //almacena favoritos
        ranking: {}
    }),

    actions: {
        addFavorite(movieID){
            const index = this.favorites.indexOf(movieID);
            if (index > -1) {
                // La película ya está en favoritos, eliminar
                this.favorites.splice(index, 1);
              } else {
                // La película no está en favoritos, agregar
                this.favorites.push(movieID);
              }
        },
        isFavorite(movieId){
            const isFav = this.favorites.includes(movieId);
            return isFav
        },
        addRanking(numberStars, movieId){
            this.ranking[movieId] = {
                numStars: numberStars
              };
        },
        ifExistRanking(movieId){
            
            const rankingEntry = this.ranking[movieId];
            if (rankingEntry) {
                return rankingEntry.numStars;
            } else {
                return null; // El ID no existe en el objeto ranking
            }
        }
    },

    getters:{

    },
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    },
});