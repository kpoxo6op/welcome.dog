<template>
<div>
  <div class="h-screen/2"></div>
  <div class="w-screen z-100050">
    <Controls></Controls>
    <SearchResults></SearchResults>
  </div>
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