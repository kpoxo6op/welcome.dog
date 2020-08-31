<template>
  <!-- :class cuts of lenghty content when full screen filter is displayed on top. -->
  <!-- This is to get rid of scrolling bar when the filter is open -->
  <!-- They set the same classes to the whole body class at airbnb. I don't have access to body class from vue -->
  <div
    v-show="!mobileMapIsFullSreen"
    :class="filterOpen ? 'fixed overflow-hidden inset-0': 'relative'"
    class="flex flex-col bg-white z-100040 items-center px-4"
  >
    <!-- TODO: don't show 'no results' when page is loading -->
    <div v-if="!dogPlaceCards.length">
      <div>No results</div>
    </div>
    <div
      v-for="(value,name) in dogPlaceCards"
      :key="name.id"
    >
      <DogPlaceCard :card="value" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import DogPlaceCard from './DogPlaceCard.vue';

export default {
  data() {
    return {
      // mobileMapIsFullSreen: false,
    };
  },

  components: {
    DogPlaceCard,
  },

  computed: {
    ...mapGetters([
      'dogPlaceCards',
    ]),

    ...mapState({
      filterOpen: (state) => state.mobileFilterIsOpen,
      mobileMapIsFullSreen: (state) => state.mobileMapIsFullSreen,
    }),
  },
};
</script>
