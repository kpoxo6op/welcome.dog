<template>
  <div class="antialiased">
    <ButtonMenu></ButtonMenu>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import ButtonMenu from './ButtonMenu.vue'
import GoogleMap from './GoogleMap.vue'
export default {
  components: {
    ButtonMenu,
    GoogleMap,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>