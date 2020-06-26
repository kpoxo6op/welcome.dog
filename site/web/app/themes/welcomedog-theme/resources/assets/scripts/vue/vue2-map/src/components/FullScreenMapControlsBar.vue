<template>
  <div class="fixed flex text-xl flex-row justify-between items-center w-full px-8 mt-12 z-100050">
    <ExitFullScreenMapButton></ExitFullScreenMapButton>
    <SearchHereButton></SearchHereButton>
    <FiltersButton></FiltersButton>
  </div>
</template>

<script>
  import FiltersButton from './FiltersButton.vue';
  import SearchHereButton from './SearchHereButton.vue';
  import ExitFullScreenMapButton from './ExitFullScreenMapButton.vue';
  export default {
    components: {
      ExitFullScreenMapButton,
      SearchHereButton,
      FiltersButton,
    },
  }
</script>