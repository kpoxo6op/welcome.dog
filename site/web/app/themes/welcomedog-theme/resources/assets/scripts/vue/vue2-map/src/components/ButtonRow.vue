<template>
  <div>
    <div v-show="!mobileMapIsFullSreen" class="sm:hidden">
      <!-- TODO: replace filter button with component -->
      <div class="relative text-center bg-white opacity-100 z-100040">
        <button @click="toggleMobileFilter"
                 type="button"
                 class="px-2 mt-8 text-xl text-center border border-gray-900 rounded-full bg-white-500">
                 Filters
        </button>
      </div>
    </div>
    <FullScreenMobileFilter></FullScreenMobileFilter>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import FullScreenMobileFilter from './FullScreenMobileFilter.vue'

export default {
  components: {
    FullScreenMobileFilter,
  },
  computed: {
    ...mapGetters([
      'categories',
    ]),
    ...mapState({
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
    }),
  },
  created() {
    this.$store.dispatch('getCategories')
  },
  methods: {
    ...mapActions([
      'getDogPlaces',
    ]),
    toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter')
    },
  },
}

</script>

<style scoped>
</style>