<template>
  <div>
    <div v-show="mapIsSmall">
      <div class="pt-6 relative text-center text-xl opacity-100 z-100040 bg-white">
        <FiltersButton />
      </div>
    </div>
    <FullScreenMobileFilter />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FullScreenMobileFilter from './FullScreenMobileFilter.vue';
import FiltersButton from './FiltersButton.vue';

export default {
  components: {
    FullScreenMobileFilter,
    FiltersButton,
  },
  computed: {
    ...mapState({
      mapIsSmall: (state) => !state.mobileMapIsFullSreen,
    }),
  },
};

</script>

<style scoped>
</style>
