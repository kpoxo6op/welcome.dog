<template>
  <div class="antialiased">
    <ButtonRow></ButtonRow>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import ButtonRow from './ButtonRow.vue'
import GoogleMap from './GoogleMap.vue'
export default {
  components: {
    ButtonRow,
    GoogleMap,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>