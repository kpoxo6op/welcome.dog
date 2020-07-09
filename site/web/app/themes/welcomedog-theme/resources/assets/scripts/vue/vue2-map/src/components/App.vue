<template>
  <div class="antialiased">
    <SearchBar></SearchBar>
    <GoogleMap></GoogleMap>
    <MainContent></MainContent>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import SearchBar from './SearchBar.vue'
import GoogleMap from './GoogleMap.vue'
import MainContent from './MainContent.vue'
export default {
  components: {
    SearchBar,
    GoogleMap,
    MainContent,
  },
}
</script>

<style>
</style>