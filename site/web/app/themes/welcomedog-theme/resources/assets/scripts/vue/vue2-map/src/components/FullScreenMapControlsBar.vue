<template>
  <div class="fixed flex text-lg flex-row justify-between items-center w-full px-8 mt-24 z-100050">
    <ExitFullScreenMapButton />
    <SearchHereButton />
    <FiltersButton />
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
};
</script>
