<template>
  <div>
    <gmap-map
      :center='center'
      :zoom='10'
      style='width:100%;  height: 400px;' 
    >
    </gmap-map>
  </div>
</template>

<script>
  export default {
    name: 'GoogleMap',
    data() {
      return {
        center: {lat: -36.848461, lng: 174.763336},
        markers: [],
        palces: [],
        currentPlace: null,
      }
    },

    mounted() {
      this.geolocate();
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