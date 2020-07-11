<template>
<!-- :class cuts of lenghty content when full screen filter is displayed on top. -->
<!-- This is to get rid of scrolling bar when the filter is open -->
<!-- They set the same classes to the whole body class at airbnb. I don't have access to body class from vue -->
<div v-show="!mobileMapIsFullSreen"
     :class="filterOpen ? 'fixed overflow-hidden inset-0': 'relative'"
     class="bg-white opacity-100 z-100040">
  <!-- TODO: don't show 'no results' when page is loading -->
  <div v-if="!dogPlaceCards.length" class="flex flex-col items-center h-screen">
    <div>No results</div>
  </div>
  <div class="flex flex-col items-center" v-for="(value,name) in dogPlaceCards" :key="name.id" >
    <DogPlaceCard
      v-bind:card="value"
    ></DogPlaceCard>
  </div>
</div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import DogPlaceCard from './DogPlaceCard.vue'
export default {
  data() {
    return {
      // mobileMapIsFullSreen: false,
    }
  },

  components: {
    DogPlaceCard,
  },
  
  computed: {
    ...mapGetters([
      'dogPlaceCards',
    ]),

    ...mapState({
      filterOpen: state => state.mobileFilterIsOpen,
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
    }),
  },
}
</script>