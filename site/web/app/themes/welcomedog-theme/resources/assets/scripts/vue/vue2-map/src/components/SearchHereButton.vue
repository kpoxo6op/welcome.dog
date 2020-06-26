<template>
  <div>
    <button v-show="searchHereBtnIsVisible" @click="searchDogPlacesWithinBounds" type="button" class="px-2 text-center bg-white border border-gray-900 rounded-full">Search Here</button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
  export default {

    computed: {
      ...mapState({
        searchHereBtnIsVisible: state => state.searchHereBtnIsVisible,
      }),
    },
    methods: {
      ...mapActions([
        'searchDogPlacesWithinBounds',
      ]),
    },
  }
</script>

<style lang="scss" scoped>

</style>