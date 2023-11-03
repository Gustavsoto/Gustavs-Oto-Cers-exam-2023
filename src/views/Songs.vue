<template>
  <div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
      <h1>SONGS</h1>
      <div class="wrapper-search">
        <input id="input-search" placeholder="Search by title..." v-model="searchText" />
      </div>
      <div class="wrapper-settings">
        <button id="btn-show-favorites" @click="toggleFavorites" :class="{ active: show_favorites }">Show Favorites</button>
      </div>
    </div>
    <div class="wrapper-songs">
      <table cellspacing="0" cellpadding="0">
        <tr ref="header">
          <th id="th-id">#</th>
          <th id="th-title" @click="sortBy('title')" :class="{ active: sortColumn === 'title' }">
            Title
            <IconCaretUp :class="{ 'flip-vertical': sortColumn === 'title' && sortDirections.title === 'desc'}" v-if="sortColumn === 'title'" />
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th
            id="th-duration"
            @click="sortBy('duration')"
            :class="{ active: sortColumn === 'duration' }"
          >
            Duration
            <IconCaretUp :class="{ 'flip-vertical': sortColumn === 'duration' && sortDirections.duration === 'desc' }" v-if="sortColumn === 'duration'" />
          </th>
        </tr>
        <tr class="song" v-for="(song, index) in filteredAndSortedSongs" :key="song.id" @dblclick="selectSong(song)" :class="{ active: isNowPlaying(song) }">
          <td id="td-index">
            <IconPlay />
            <span id="txt-index">{{ index + 1 }}</span>
          </td>
          <td id="td-title" :class="{ active: isNowPlaying(song) }">
            <img :src="song.album.images[1].url" />
            {{ song.name }}
          </td>
          <td id="td-artist" :class="{ active: isNowPlaying(song) }">{{ getArtists(song.artists) }}</td>
          <td id="td-album">{{ song.album.name || '' }}</td>
          <td id="td-duration">
            {{ getTime(song.duration_ms) }}
            <IconHeart :class="{ active: isFavorite(song) }" @click="toggleFavoriteStatus(song)" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import songsData from '../data/songs.js';
import IconCaretUp from '../components/icons/IconCaretUp.vue';
import IconPlay from '../components/icons/IconPlay.vue';
import IconHeart from '../components/icons/iconHeart.vue';
import { useAuthStore } from '../stores/auth';
import { usePlayerStore } from '@/stores/player';

export default {
  components: {
    IconCaretUp,
    IconPlay,
    IconHeart,
  },
  data() {
    return {
      searchText: '',
      show_favorites: false,
      sortColumn: '',
      SongsData: songsData,
      activeHeartStatus: {},
      sortDirections: {
        title: 'asc',
        duration: 'asc',
      },
    };
  },
  computed: {
  filteredAndSortedSongs() {
    let filteredSongs = this.filterSongs(this.SongsData, this.searchText);

    if (this.show_favorites) {
      filteredSongs = filteredSongs.filter((song) => this.isFavorite(song));
    }
    const sortedSongs = this.sortSongs(filteredSongs, this.sortColumn, this.sortDirections[this.sortColumn]);

    return sortedSongs;
  },
    isFavorite() {
      const auth = useAuthStore();
      return (song) => {
        const songIdString = String(song.id);
        return auth.getFavoriteSongs.includes(songIdString);
      };
    },
    isNowPlaying() {
      const player = usePlayerStore();
      return (song) => song.id === player.getNowPlayingSongId;
    },
  },
  methods: {
    handleScroll(event) {
      this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
    },
    toggleFavorites() {
      this.show_favorites = !this.show_favorites;
    },
    isActiveHeart(song) {
      const songIdString = String(song.id);
      const favoriteSongs = useAuthStore.getFavoriteSongs || [];
      return favoriteSongs.includes(songIdString);
    },
    toggleFavoriteStatus(song) {
      const songIdString = String(song.id);
      const auth = useAuthStore();
      auth.toggleFavorite(songIdString);
      this.activeHeartStatus[song.id] = !this.activeHeartStatus[song.id];
    },
    filterSongs(songs, searchText) {
      return songs.filter((song) => {
        const songTitle = song.name.toLowerCase();
        const search = searchText.toLowerCase();
        return songTitle.startsWith(search);
      });
    },
    sortSongs(songs, column, direction) {
      let sortedSongs = [...songs];

      if (column === 'title') {
        sortedSongs.sort((a, b) => {
          return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
      } else if (column === 'duration') {
        sortedSongs.sort((a, b) => {
          return direction === 'asc' ? a.duration_ms - b.duration_ms : b.duration_ms - a.duration_ms;
        });
      }

      return sortedSongs;
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirections[column] = this.sortDirections[column] === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
      }
    },
    getArtists(artists) {
      return artists.map((artist) => artist.name).join(', ');
    },
    getTime(duration_ms) {
      const totalSeconds = Math.floor(duration_ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutes}:${formattedSeconds}`;
    },
    selectSong(song) {
            const player = usePlayerStore();
            this.click++;
            if (this.click === 1) {
                this.timer = setTimeout(() => {
                    this.click = 0;
                }, 500);
            } else {
                clearTimeout(this.timer);
                player.setNowPlaying(song);
                this.click = 0;
            }
        },
  },
};
</script>