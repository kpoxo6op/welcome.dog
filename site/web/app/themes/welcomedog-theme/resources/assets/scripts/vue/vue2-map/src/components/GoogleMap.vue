<template>
  <div>
    <!-- v-show="mobileMapIsFullSreen" breaks slider -->
    <div class="fixed w-full h-full">
      <FullScreenMapControlsBar v-show="mobileMapIsFullSreen"></FullScreenMapControlsBar>
      <FullScreenSwipeCardsBar v-if="mobileMapIsFullSreen"></FullScreenSwipeCardsBar>
      <GmapMap
        ref="mapRef"
        class="fixed w-full h-full"
        @zoom_changed="showSearchHereBtn"
        @dragend="showSearchHereBtn"
        @click="goFullScreen"
        @dragstart="goFullScreen"
        @rightclick="goFullScreen"
        @dblclick="goFullScreen"
        @idle="onIdle"
        @bounds_changed="boundsChanged"
        :center="changingCenter"
        :zoom='10'
        style=''
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
          v-for='(m, index) in allDogPlaceCoordinates'
          :key='m.id'
          :position='m.position'
          :clickable='true'
          :draggable='false'
          @click="selectMarker({
            index: index
            //id: m.id
          })"
          :icon="{
            //url: require('./pets-black-18dp.svg'),
            fillColor: index === selectedMapMarkerIndex ? 'black' : 'white',
            fillOpacity: 1,
            //strokeWeight: 0,
            scale: 1.3,
            path: 'M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z',
          }"
        >
        </GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>
<script>

import {mapGetters, mapState, mapActions} from 'vuex';
import FullScreenMapControlsBar from './FullScreenMapControlsBar.vue';
import FullScreenSwipeCardsBar from './FullScreenSwipeCardsBar.vue';
export default {
  components: {
    FullScreenMapControlsBar,
    FullScreenSwipeCardsBar,
  },

  name: 'GoogleMap',
  data() {
    return {
      changingCenter: {
        lat: -36.8485,
        lng: 174.7633,
      },
      //imageUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    }
  },

  computed: {
    ...mapGetters({
      allDogPlaceCoordinates: 'allDogPlaceCoordinates',
      boundsAreSet: 'boundsAreSet',
    }),

    ...mapState({
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
      mapIsSmall: state => !state.mobileMapIsFullSreen,
      selectedMapMarkerIndex: state => state.selectedMarkerIndex,
      boundsExist: state => state.mapBounds,
    }),
  },

  watch: {
    mobileMapIsFullSreen(isFullSreen) {
      if (isFullSreen) {
        this.$refs.mapRef.panBy(0, -120)
      } else {
        this.$refs.mapRef.panBy(0, +120)
      }
    },
  },

  created () {//change to created event handler
      // this.$store.dispatch("userRequest").then(profile => {
      //   if (this.$store.getters.isAuthenticated) {//wait for user request action to complete before evaluating getters
      //   Vue.prototype.$gate = new Gate(profile);//can use profile directly here
      // }
      // });
  },

  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
 
     this.$refs.mapRef.$mapPromise.then((map) => {
       if (this.mapIsSmall) {
         //TODO: pan to variable value because due to different screen size
         map.panBy(0, +120)
       }
     })
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
        this.$store.commit('enterFullScreenMap')
      }
    },

    onIdle() {
      this.$store.commit('mapIsIdle', true)
      // console.log('4.0 dispatch "Set map bounds"')
      // this.$store.commit('setBounds', this.$refs.mapRef.$mapObject.getBounds())
      // .then(() => {
      //   console.log('4.2 check mapBounds object status')
      //   console.log('mapBounds', this.$store.mapBounds)
      // })
    },

    boundsChanged() {
      if (this.boundsAreSet) {
        console.log('1.2 bounds already set (duplicate boundsChanged event bug)')
      } else {
        console.log('1.0 dispatch "Set map bounds"')
        this.$store.dispatch('setBounds', this.$refs.mapRef.$mapObject.getBounds())
        .then(() => {
          if (this.$route.query.category) {
            console.log('2.0 commit "save category names from URL"')
            this.$store.commit('setURLCategories', this.$route.query.category)
            console.log('3.0 dispatch "set Categories"')
            this.$store.dispatch('setCategories').then(() => {
              if (this.requestSuccess && this.boundsAreSet) {
                console.log('5.0 dispatch "Get places"')
                this.$store.dispatch('getDogPlaces')
              } else {
                console.log('5.0 doesnt meet conditions to get dogplaces: ')
                console.log('this.requestSuccess', this.requestSuccess)
                console.log('this.boundsAreSet', this.boundsAreSet)
              }
            });
          }
        })
      }
    },
  },
}


</script>

<style lang='scss' scoped>

</style>


