<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button id="btn-edit" @click="toggleEditMode" :class="{active: editMode}" >{{ editMode ? 'cancel' : 'Edit Form' }}</button>
                <button id="btn-save" v-if="editMode" @click="saveInfo">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <input id="input-name" v-if="editMode" v-model="name"/>
                <p id="txt-name" v-if="!editMode">{{ name }}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input id="input-surname" v-if="editMode" v-model="surname" />
                <p id="txt-surname" v-if="!editMode">{{ surname }}</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input id="input-code" v-if="editMode" v-model="code" />
                <p id="txt-code" v-if="!editMode">{{code}}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="!noFavoriteSongs">
                    <li v-for="song in favoriteList" :key="song">
                        <img id="img-album" :src="song.album.images[1].url" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{ song.name }}</p>
                            <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-if="noFavoriteSongs">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>
<script>
import { useAuthStore } from '../stores/auth.js';
export default {
    data(){
        const state = useAuthStore();
        return{
            editMode: false,
            name: state.user.name,
            surname: state.user.surname,
            code: state.user.code,
            favoriteList: state.getFavoriteSongs,
        }
    },
    computed: {
        noFavoriteSongs() {
            const fav = useAuthStore();
            return this.favoriteList.length === 0;
        }
    },
    methods: {
        toggleEditMode(){
            this.editMode = !this.editMode;
        },
        saveInfo(){
            this.editMode = false;
            const updated = useAuthStore();
            updated.user.name = this.name;
            updated.user.surname = this.surname;
            updated.user.code = this.code;
        },
        getArtists(artists) {
            return artists.map((artist) => artist.name).join(', ');
        },
    }
    

}
</script>