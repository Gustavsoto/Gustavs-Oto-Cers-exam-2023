import { defineStore } from 'pinia'
import router from "../router"
export const useAuthStore = defineStore('authentication', {
    // STATE MAINĪGIE
    user: {
        name: 'NAME',
        surname: 'SURNAME',
        code: 'IT1234',
        favorite_songs: localStorage.favorite_songs ? localStorage.favorite_songs.split(",") : []
    },
    authenticated: false,

    // GETTERS METODES
    is_authenticated() {
        localStorage.authenticated ?? false;
        return (localStorage.authenticate !== null) ? localStorage.authenticated : this.authenticated;
    },
    getFavoriteSongs() {
        return this.user.favorite_songs;
    },

    // ACTIONS METODES
    setUserData(name, surname, code) {
        this.user.name = name;
        this.user.surname = surname;
        this.user.code = code;
    },
    authenticate(email, password) {
        if(email === "gustavsoto.cers@va.lv" && password === "123456"){
            localStorage.authenticated = true;
            this.authenticated = true;
            router.push('/');
        }
    },
    logout() {
        localStorage.clear();
        this.authenticated = false;
        router.push('/login');
    },
    toggleFavorite(songID) {
        if(this.user.favorite_songs.indexOf(songID) !== -1){
            this.user.favorite_songs.splice(this.user.favorite_songs.indexOf(songID), 1);
        } else {
            this.user.favorite_songs.push(songID);
        }
    },
})