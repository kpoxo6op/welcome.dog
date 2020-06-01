<template>
  <div>
    <div class="fixed w-full h-full">
      <FullScreenMapControlsBar v-show="mobileMapIsFullSreen"></FullScreenMapControlsBar>
      <GmapMap
        ref="mapRef"
        class="fixed w-full h-full"
        @click="enterFullScreenMap"
        @dragstart="enterFullScreenMap"
        @rightclick="enterFullScreenMap"
        @mousedown="enterFullScreenMap"
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
        :draggable='true'
        @click='center=m.position'
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
         console.log('shifting map y pixels up when map is created')
         map.panBy(0, 130)
       }
     })
  },

  methods: {
    enterFullScreenMap() {
      if (!this.mobileMapIsFullSreen) {
        this.$store.commit('enterFullScreenMap')
        //TODO: Consider hiding things with z-index
        console.log('shifting map y pixels down when entering fullscreen')
        this.$refs.mapRef.panBy(0, -130)
      }
    },

},
}
</script>

<style lang='scss' scoped>

</style>