<template>
  <div class="antialiased">
    <SearchBar></SearchBar>
    <GoogleMap></GoogleMap>
    <ButtonRow></ButtonRow>
    <SearchResults></SearchResults>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import SearchBar from './SearchBar.vue'
import ButtonRow from './ButtonRow.vue'
import GoogleMap from './GoogleMap.vue'
import SearchResults from './SearchResults.vue'
export default {
  components: {
    SearchBar,
    ButtonRow,
    GoogleMap,
    SearchResults,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>