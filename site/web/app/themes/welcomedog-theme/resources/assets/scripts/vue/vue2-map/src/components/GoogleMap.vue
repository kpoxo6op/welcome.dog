<template>
  <div>
    <div class="fixed w-full h-full">
      <FullScreenMapControlsBar v-show="mobileMapIsFullSreen"></FullScreenMapControlsBar>
      <FullScreenSwipeCardsBar v-if="mobileMapIsFullSreen"></FullScreenSwipeCardsBar>
      <GmapMap
        ref="mapRef"
        class="fixed w-full h-full"
        @click="enterFullScreenMap"
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
        v-for='m in allDogPlaceCoordinates'
        :key='m.id'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        @click="showDogPlaceCard"
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
import {mapGetters, mapState} from 'vuex';
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
        lat: -36.85,
        lng: 174.76,
      },
      imageUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    }
  },

  computed: {
    ...mapGetters({
      allDogPlaceCoordinates: 'allDogPlaceCoordinates',
    }),

    ...mapState({
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
    }),
  },

  created() {
    this.$store.dispatch('getDogPlaces')

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'exitFullScreenMap') {
        console.log('exitFullScreenMap mutation subscription triggered')
        console.log('shifting map y pixels UP when EXITING fullscreen')
        this.$refs.mapRef.panBy(0, +130)
      }
    })
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
 
     this.$refs.mapRef.$mapPromise.then((map) => {
       if (!this.mobileMapIsFullSreen) {
         map.panBy(0, 130)
         console.log('pan map up on start')
       }
     })
  },

  methods: {
    enterFullScreenMap() {
      //this fires once
      if (!this.mobileMapIsFullSreen) {
        this.$store.commit('enterFullScreenMap')
        this.$refs.mapRef.panBy(0, -130)
        console.log('map goes fullscreen')
      }
    },

    showDogPlaceCard() {
      //TODO: find out why this method is fired two times sometimes
      //TODO: find out why this method is not fired at all sometimes
      console.log('go fullscreen and display dog place info window')
      this.enterFullScreenMap()
    },
},
}
</script>

<style lang='scss' scoped>

</style>