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
                <p id="txt-name">John</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input id="input-surname" v-if="editMode" v-model="surname" />
                <p id="txt-surname">Smith</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input id="input-code" v-if="editMode" v-model="code" />
                <p id="txt-code">IT1234</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul>
                    <li>
                        <img id="img-album" src="https://i.scdn.co/image/ab67616d00001e02980c9d288a180838cd12ad24" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">DEEP (feat. Nonô)</p>
                            <p id="txt-artist" class="song-artists">Example</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>
<script>
import { useAuthStore } from '../stores/auth.js';
export default {
    data(){
        return{
            editMode: false,
            name: 'John',
            surname: 'Smith',
            code: 'IT1234'
        }
    },
    methods: {
        toggleEditMode(){
            this.editMode = !this.editMode;
        },
        saveInfo(){
            this.editMode = false;
            useAuthStore.user.name = this.name;
            useAuthStore.user.surname = this.surname;
            useAuthStore.user.code = this.code;
        }
    }
    

}
</script>