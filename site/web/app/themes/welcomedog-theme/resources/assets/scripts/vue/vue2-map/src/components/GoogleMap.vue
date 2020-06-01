<template>
  <div>
    <div class="fixed w-full h-full">
      <FullScreenMapControlsBar v-show="mobileMapIsFullSreen"></FullScreenMapControlsBar>
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
import {mapGetters, mapState} from 'vuex';
import FullScreenMapControlsBar from './FullScreenMapControlsBar.vue';
export default {
  components: {
    FullScreenMapControlsBar,
  },

  name: 'GoogleMap',
  data() {
    return {
      changingCenter: {
        lat: -36.85,
        lng: 174.76,
        },
      //move this thing to the store
      //mobileMapIsFullSreen: false,
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
       }
     })
  },

  methods: {
    enterFullScreenMap() {
      //this fires once
      if (!this.mobileMapIsFullSreen) {
        this.$store.commit('enterFullScreenMap')
        this.$refs.mapRef.panBy(0, -130)
        console.log('map goes fullscreen on map click')
      }
    },

    showDogPlaceCard() {
      //TODO: find out why this method is fired two times
      console.log('display dog place info window on marker click')
      console.log('map still goes fullscreen on marker click')
      this.enterFullScreenMap()
    },
},
}
</script>

<style lang='scss' scoped>

</style>