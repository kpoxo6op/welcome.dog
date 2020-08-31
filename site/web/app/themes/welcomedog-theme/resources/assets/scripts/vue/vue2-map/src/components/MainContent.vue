<template>
  <div>
    <div class="h-screen/2" />
    <div class="w-full z-100050">
      <Controls />
      <SearchResults />
    </div>
  </div>
</template>

<script>
import Controls from './Controls.vue';
import SearchResults from './SearchResults.vue';

export default {
  components: {
    Controls,
    SearchResults,
  },
};
</script>
