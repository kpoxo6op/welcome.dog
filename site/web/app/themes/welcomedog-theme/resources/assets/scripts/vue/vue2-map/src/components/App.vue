<template>
  <div class="antialiased">
    <Filters></Filters>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import Filters from './Filters.vue'
import GoogleMap from './GoogleMap.vue'
export default {
  components: {
    Filters,
    GoogleMap,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>