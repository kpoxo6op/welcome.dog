<template>
  <div class="fixed flex flex-row justify-between w-full px-8 mt-12 z-100050">
    <ExitFullScreenMapButton></ExitFullScreenMapButton>
    <FiltersButton></FiltersButton>
  </div>
</template>

<script>
  import FiltersButton from './FiltersButton.vue';
  import ExitFullScreenMapButton from './ExitFullScreenMapButton.vue';
  export default {
    components: {
      ExitFullScreenMapButton,
      FiltersButton,
    },
  }
</script>