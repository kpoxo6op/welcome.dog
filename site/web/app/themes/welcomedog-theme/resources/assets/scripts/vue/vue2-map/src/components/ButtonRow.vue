<template>
      <div>
        <!-- show on mobile screen only -->
        <!-- VISIBLE -->
        <!-- sm:hidden min-width:  640px -->
        <!-- md:hidden min-width:  768px -->
        <!-- lg:hidden min-width: 1024px -->
        <!-- xl:hidden min-width: 1280px -->
        <div class="sm:hidden">
          <div>
            <button @click="filterOpen = !filterOpen" type="button">Filters</button>
          </div>
          <div :class="filterOpen ? 'block' : 'hidden'" class="fixed inset-0 w-full h-full bg-white z-100000 flex flex-col items-center md:static">
            <div class="w-full z-100010 mt-2">
              <div class="flex justify-between">
                <div class="w-1/3">
                  <button class="pl-4" @click="closeFilter">X</button>
                </div>
                <div class="w-1/3 text-center">
                  <h6 class="text-gray-900 font-semibold">Filters</h6>
                </div>
                <div class="w-1/3 text-right">
                  <button class="pr-4" @click="clearAllCheckboxesAction">Clear all</button>
                </div>
              </div>
              <hr class="border-gray-500 mt-2 mx-4">
            </div>
            <div class="w-1/3">
              <div class="mt-4 md:p-2" v-for="(value, name) in categories" :key="name.id">
                <MenuButtonMobile
                  v-bind:button="value"
                ></MenuButtonMobile>
                <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
              </div>
            </div>
            <div class="absolute inset-x-0 bottom-0 text-center">
              <button class="p-4" @click="showResults">Show Results</button>
            </div>
          </div>
        </div>
        <!-- show on tablet screen and bigger -->
        <!-- HIDDEN -->
        <!-- sm:visibl min-width:  640px -->
        <!-- md:visibl min-width:  768px -->
        <!-- lg:visibl min-width: 1024px -->
        <!-- xl:visibl min-width: 1280px -->
        <div class="hidden sm:flex">
          <div v-for="(value, name) in categories" :key="name.id">
            <MenuButton
              v-bind:button="value"
            ></MenuButton>
            <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
          </div>
        </div>
      </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MenuButtonMobile from './MenuButtonMobile.vue'
import MenuButton from './MenuButton.vue'

export default {
  components: {
    MenuButtonMobile,
    MenuButton,
  },
  data() {
    return {
      errors: [],
      filterOpen: false,
    }
  },
  
  computed: {
    ...mapGetters([
      'categories',
    ]),
  },

  created() {
    this.$store.dispatch('getCategories')
  },

  methods: {
    ...mapActions([
      'closeCards',
      'clearAllCheckboxesAction',
      'getDogPlaces',
    ]),

    showResults() {
      this.$store.dispatch('getDogPlaces')
      this.filterOpen = false
    },

    closeFilter() {
      this.filterOpen = false
    },
  },
}

</script>

<style scoped>
</style>