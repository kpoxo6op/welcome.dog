<template>
  <div>
    <button
      v-show="searchHereBtnIsVisible"
      @click="searchHere"
      type="button"
      class="px-2 text-center bg-white border border-gray-900 rounded-full"
    >
      Search Here
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      searchHereBtnIsVisible: (state) => state.searchHereBtnIsVisible,
    }),
  },
  methods: {
    searchHere() {
      this.$store.dispatch('getDogPlaces');
      this.$store.commit('hideSearchHereBtn');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
