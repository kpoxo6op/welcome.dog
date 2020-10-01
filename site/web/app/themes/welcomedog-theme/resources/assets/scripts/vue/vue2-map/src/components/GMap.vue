<template>
  <div>
    <h1>Map component</h1>
    <div
      id="map"
      class="h-64"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lat: -36.8485,
      lng: 174.7633,
      zoom: 10,
    };
  },
  mounted() {
    this.$map = new window.google.maps.Map(document.getElementById('map'), {
      center: new window.google.maps.LatLng(this.lat, this.lng),
      zoom: this.zoom,
    });
  },

};
</script>
