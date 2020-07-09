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
/*
<googlemaps-marker
  v-for="post of posts"
  :key="post._id"
  :label="{
    color: post === currentPost ? 'white' : 'black',
    fontFamily: 'Material Icons',
    fontSize: '20px',
    text: 'face',
  }"
  :position="post.position"
  :z-index="5"
  @click="selectPost(post._id)"
/>
*/

/*
marker Properties
-----------------
animation : number
attribution : object
clickable : boolean
cursor : string
draggable : boolean
icon : object
label : string
opacity : number
place : object
position : {lat: number, lng: number} | google.maps.LatLng
shape : object        - https://diegoazh.github.io/gmap-vue/examples/basic-marker-shape.html#live-example
title : string
zIndex : number

*/
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
    }),

    ...mapState({
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
      selectedMapMarkerIndex: state => state.selectedMarkerIndex,
      boundsExist: state => state.mapBounds,
    }),
  },

  watch: {
    mobileMapIsFullSreen(isFullSreen) {
      if (isFullSreen) {
        this.$refs.mapRef.panBy(0, 0)
      } else {
        this.$refs.mapRef.panBy(0, 0)
      }
    },
  },

  created() {
    //TODO: get dogplaces AFTER we have our bounds in store
    //this.$store.dispatch('getDogPlaces')
  },

  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
 
     this.$refs.mapRef.$mapPromise.then((map) => {
       if (!this.mobileMapIsFullSreen) {
         //TODO: pan to variable value because due to different screen size
         map.panBy(0, 0)
       }
     })
  },

  methods: {

    ...mapActions([
      'selectMarker',
      'showSearchHereBtn',
    ]),

    goFullScreen() {
      if (!this.mobileMapIsFullSreen) {
        this.$store.commit('enterFullScreenMap')
      }
    },

    onIdle() {
      this.$store.commit('mapIsIdle', true)
      //TODO: replace workaround with mounted hooks
      //getBounds and getDogplaces
      if (!this.boundsExist) {
        this.$store.commit('setBounds', this.$refs.mapRef.$mapObject.getBounds())
        this.$store.dispatch('getDogPlaces')
      }
      this.$store.commit('setBounds', this.$refs.mapRef.$mapObject.getBounds())
    },
  },
}
</script>

<style lang='scss' scoped>

</style>