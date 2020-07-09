<template>
<div v-show="!mobileMapIsFullSreen" v-bind:class="{fixed: filterOpen}" class="relative bg-white opacity-100 z-100040">
  <!-- TODO: don't show 'no results' when page is loading -->
  <div v-if="!dogPlaceCards.length" class="flex flex-col items-center h-64">No results</div>
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