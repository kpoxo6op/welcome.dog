<template>
  <div>
    <div class="fixed w-full h-full">
      <GmapMap
        ref="mapRef"
        class="fixed w-full h-full"
        @click="toggleFullScreenMap"
        @dragstart="toggleFullScreenMap"
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
import {mapGetters, mapActions, mapState} from 'vuex';

export default {
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
    ...mapActions([
      'toggleFullScreenMapAction',
    ]),
    toggleFullScreenMap() {
      if (this.mobileMapIsFullSreen) {
        //TODO: Consider hiding things with z-index
        console.log('shifting map y pixels down when entering fullscreen')
        this.$refs.mapRef.panBy(0, +130)
        console.log('hide search bar when entering fullscreen')
        console.log('hide filters and results pane when entering fullscreen')
      } else {
        console.log('shifting map y pixels UP when EXITING fullscreen')
        this.$refs.mapRef.panBy(0, -130)
        console.log('SHOW search bar when EXITING fullscreen')
        console.log('SHOW filters and results pane when EXITING fullscreen')
      }
      this.toggleFullScreenMapAction()
    },
  },
}
</script>

<style lang='scss' scoped>

</style>