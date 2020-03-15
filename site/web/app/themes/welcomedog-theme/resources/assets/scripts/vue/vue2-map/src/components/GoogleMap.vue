<template>
  <div>
    <GmapMap
      :center='center'
      :zoom='10'
      style='height: 400px;'
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
</template>

<script>
import {mapGetters } from 'vuex';
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: {lat: -36.848461, lng: 174.763336},
      // markers: [
      //   { position: { lat: -36.8808, lng: 175.0416 } },
      //   { position: { lat: -36.8482, lng: 174.8318 } },
      // ],
      currentPlace: null,
    }
  },

  computed: {
    ...mapGetters({
      allDogPlaceCoordinates: 'allDogPlaceCoordinates',
    }),
  },

  created() {
    this.$store.dispatch('getDogPlaces')
  },

  mounted() {
    //this.geolocate();
  },

  methods: {
    geolocate: function() {
      //example - https://codesandbox.io/s/x3332w98po
      //localhost error - A Geolocation request can only be fulfilled in a secure context.
      navigator.geolocation.getCurrentPosition(position =>{
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    },
  },
}
</script>

<style lang='scss' scoped>

</style>