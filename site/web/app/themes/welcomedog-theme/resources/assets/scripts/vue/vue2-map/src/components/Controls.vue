<template>
  <div>
    <div v-show="!mobileMapIsFullSreen" class="sm:hidden">
      <!-- TODO: replace filter button with component -->
      <div class="relative text-center bg-white opacity-100 z-100040">
        <button @click="toggleMobileFilter"
                :class="{'border-gray-700 text-gray-600': someCheckboxesMarked}"
                 class="border border-gray-900 text-gray-800 rounded-full px-2 mt-8 text-xl text-centerrounded-full bg-white-500"
                 type="button"
                 >
                 {{ labelText }}
        </button>
      </div>
    </div>
    <FullScreenMobileFilter></FullScreenMobileFilter>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import FullScreenMobileFilter from './FullScreenMobileFilter.vue'

export default {
  components: {
    FullScreenMobileFilter,
  },
  computed: {
    ...mapState({
      mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
    }),
    
    ...mapGetters([
      'someCheckboxesMarked',
      'markedCheckboxesCount',
      'boundsAreSet',
      'requestSuccess',
    ]),

    labelText() {
      if (this.someCheckboxesMarked) {
        return 'Filters · ' + this.markedCheckboxesCount
      } else {
        return 'Filters'
      }
    },
  },

  created() {
    // if (this.$route.query.category) {

    //   console.log('1.0 commit "save category names from URL"')
    //   this.$store.commit('setURLCategories', this.$route.query.category)

    //   console.log('2.0 dispatch "set Categories"')
    //   this.$store.dispatch('setCategories').then(() => {
    //     if (this.requestSuccess && this.boundsAreSet) {
    //       console.log('5.0 dispatch "Get places"')
    //       this.$store.dispatch('getDogPlaces')
    //     } else {
    //       console.log('5.0 doesnt meet conditions to get dogplaces: ')
    //       console.log('this.requestSuccess', this.requestSuccess)
    //       console.log('this.boundsAreSet', this.boundsAreSet)
    //     }
    //   });

    // } else {
    //   console.log('1.0 no categories in URL found')
    //   console.log('2.0 dispatch "set Categories"')
    //   this.$store.dispatch('setCategories')
    // }
  },

  mounted() {

  },

  methods: {
     toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter')
    },
  },
}

</script>

<style scoped>
</style>