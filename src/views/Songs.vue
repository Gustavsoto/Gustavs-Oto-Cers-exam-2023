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
            <IconCaretUp :class="{ 'flip-vertical': sortColumn === 'title' && titleSortDirection === 'desc'}" v-if="sortColumn === 'title'" />
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th
            id="th-duration"
            @click="sortBy('duration')"
            :class="{ active: sortColumn === 'duration' }"
          >
            Duration
            <IconCaretUp :class="{ 'flip-vertical': sortColumn === 'duration' && durationSortDirection === 'desc' }" v-if="sortColumn === 'duration'" />
          </th>
        </tr>
        <tr class="song" v-for="(song, index) in sortedSongs" :key="song.id" @dblclick="selectSong(song)">
          <td id="td-index">
            <IconPlay />
            <span id="txt-index">{{ index + 1 }}</span>
          </td>
          <td id="td-title">
            <img :src="song.album.images[1].url" />
            {{ song.name }}
          </td>
          <td id="td-artist">{{ getArtists(song.artists) }}</td>
          <td id="td-album">{{ song.album.name || '' }}</td>
          <td id="td-duration">
            {{ getTime(song.duration_ms) }}
            <IconHeart :class="{active: true}" />
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
      sortColumn: '', // Default sorting column
      SongsData: songsData,
      sortDirections: {
        title: 'asc',
        duration: 'asc',
      },
    };
  },
  computed: {
    sortedSongs() {
      return this.sortSongs(this.sortColumn, this.sortDirections[this.sortColumn]);
    },
  },
  methods: {
    handleScroll(event) {
      this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
    },
    toggleFavorites() {
      this.show_favorites = !this.show_favorites;
    },
    sortSongs(column, direction) {
      let sortedSongs = [...this.SongsData];

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
      // Implement logic to play the selected song.
      // You can use the song object to play it.
      // You may need to use a global method or a player component to handle song playback.
    },
  },
};
</script>