<template>
  <div class="bg-white">
    <!-- TODO: replace fixed height with proper map window -->
    <!-- insert h-64 windows between searchbar and button row -->
    <div class="h-64"></div>
    <Controls></Controls>
    <SearchResults></SearchResults>
  </div>
</template>

<script>
import Controls from './Controls.vue'
import SearchResults from './SearchResults.vue'
export default {
  components: {
    Controls,
    SearchResults,
  },
}
</script>