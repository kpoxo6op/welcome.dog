<template>
  <div>
    <!-- v-show="mobileMapIsFullSreen" breaks slider -->
    <div class="fixed w-full h-full">
      <div class="mt-32 fixed z-100050 w-full bg-yellow-200">
        autocompleteData: {{ autocompleteData }}
      </div>
      <div class="mt-48 fixed z-100050 w-full bg-yellow-400">
        searchResultsDogPlaces: {{ this.searchResultsDogPlaces }}
      </div>
      <div class="mt-64 fixed z-100050 w-full bg-yellow-600">
        searchResults: {{ searchResults }}
      </div>
      <FullScreenMapControlsBar v-show="mobileMapIsFullSreen" />
      <FullScreenSwipeCardsBar v-if="mobileMapIsFullSreen" />
      <SearchBar
        v-model="searchString"
        :search-results="searchResults"
      />
      <GmapMap
        ref="mapRef"
        class="fixed w-full h-full"
        @zoom_changed="showSearchHereBtn"
        @bounds_changed="boundsChanged"
        @dragend="showSearchHereBtn"
        @click="goFullScreen"
        @dragstart="goFullScreen"
        @rightclick="goFullScreen"
        @dblclick="goFullScreen"
        @idle="onIdle"
        :center="initCenter"
        :zoom="10"
        style=""
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
        }"
      >
        <GmapMarker
          v-for="(m, index) in allDogPlaceCoordinates"
          :key="m.id"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="selectMarker({
            index: index
            //id: m.id
          })"
          :icon="{
            //url: require('./pets-black-18dp.svg'),
            fillColor: index === selectedMapMarkerIndex && mobileMapIsFullSreen? 'black' : 'white',
            fillOpacity: 1,
            //strokeWeight: 0,
            scale: 1.3,
            // eslint-disable-next-line max-len
            path: 'M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z',
          }"
        />
      </GmapMap>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapState, mapActions } from 'vuex';
import FullScreenMapControlsBar from './FullScreenMapControlsBar.vue';
import FullScreenSwipeCardsBar from './FullScreenSwipeCardsBar.vue';
import SearchBar from './SearchBar.vue';

export default {

  components: {
    FullScreenMapControlsBar,
    FullScreenSwipeCardsBar,
    SearchBar,
  },

  name: 'GoogleMap',
  data() {
    return {
      initCenter: {
        lat: -36.8485,
        lng: 174.7633,
      },
      searchString: '',
      searchResultsMap: [],
      searchResultsDogPlaces: [],
      searchResults: [],
      AutocompleteService: null,
    };
  },

  computed: {
    ...mapGetters(['allDogPlaceCoordinates', 'boundsAreSet', 'center']),
    ...mapState({
      mobileMapIsFullSreen: (state) => state.mobileMapIsFullSreen,
      mapIsSmall: (state) => !state.mobileMapIsFullSreen,
      selectedMapMarkerIndex: (state) => state.selectedMarkerIndex,
      boundsExist: (state) => state.mapBounds,
      autocompleteData: (state) => state.autocompleteData,
    }),
  },

  watch: {
    mobileMapIsFullSreen(isFullSreen) {
      if (isFullSreen) {
        this.$refs.mapRef.panBy(0, -120);
      } else {
        this.$refs.mapRef.panBy(0, +120);
      }
    },
    searchString(newValue) {
      if (newValue) {
        if (this.searchString.length < 3) {
          this.searchResultsMap = [];
          this.searchResultsDogPlaces = [];
          this.searchResults = [];
          return;
        }
        const request = {
          input: this.searchString,
          componentRestrictions: { country: 'nz' },
          types: ['(cities)'],
          sessionToken: this.sessionToken,
          bounds: this.$store.state.mapBounds,
        };
        this.AutocompleteService.getPlacePredictions(request, this.getSuggestions);
      }
    },
  },

  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.mapRef.$mapPromise.then((map) => {
      if (this.mapIsSmall) {
        // TODO: pan to variable value because due to different screen size
        map.panBy(0, +120);
      }
      this.AutocompleteService = new window.google.maps.places.AutocompleteService();
      this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    });
  },

  methods: {

    ...mapActions([
      'selectMarker',
      'showSearchHereBtn',
      'setBounds',
      'requestSuccess',
    ]),

    goFullScreen() {
      if (this.mapIsSmall) {
        this.$store.commit('enterFullScreenMap');
      }
    },

    getSuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResultsMap = [];
      } else {
        this.searchResultsMap = predictions.map((prediction) => prediction.description);
      }
      this.searchResultsDogPlaces = this.autocompleteData.filter((el) => el.toLowerCase().includes(this.searchString.toLowerCase()));
      this.searchResults = [...this.searchResultsMap, ...this.searchResultsDogPlaces];
    },

    async onIdle() {
      this.$store.commit('mapIsIdle', true);
      this.$store.dispatch('setCenter', this.$refs.mapRef.$mapObject.getCenter());

      // no bounds mean we just loaded our app
      if (!this.boundsAreSet) {
        // eslint-disable-next-line vars-on-top, no-var
        var init = true;
        if (this.$route.query.category) {
          await this.$store.dispatch('addToFilterFromURL', this.$route.query.category);
        }
      }
      await this.$store.dispatch('setBounds', this.$refs.mapRef.$mapObject.getBounds());
      // eslint-disable-next-line block-scoped-var
      if (init) {
        await this.$store.dispatch('getDogPlaces');
        await this.$store.dispatch('getAutocompleteData');
      }
    },

    boundsChanged() {},
  },
};

</script>

<style lang='scss' scoped>

</style>
