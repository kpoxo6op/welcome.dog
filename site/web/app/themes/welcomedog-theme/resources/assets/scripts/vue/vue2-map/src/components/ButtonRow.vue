<template>
      <div>
        <!-- show on mobile screen only -->
        <!-- VISIBLE -->
        <!-- sm:hidden min-width:  640px -->
        <!-- md:hidden min-width:  768px -->
        <!-- lg:hidden min-width: 1024px -->
        <!-- xl:hidden min-width: 1280px -->
        <div class="sm:hidden">
          <div class="text-center mt-2">
            <button @click="filterOpen = !filterOpen" type="button" class="text-center border border-gray-900 rounded-full px-2 text-2xl">Filters</button>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-show="filterOpen" class="fixed inset-0 w-full h-auto bg-white overflow-auto z-100000 flex flex-col items-center md:static">
              <div class="fixed w-full z-100050 bg-white h-16">
                <div class="flex items-baseline text-2xl mt-4">
                  <div class="w-1/3">
                     <button class="w-full pl-8 text-left" @click="closeFilter">X</button>
                  </div>
                  <div class="w-1/3 text-center">
                    <h6 class="text-gray-900 font-semibold">Filters</h6>
                  </div>
                  <div class="w-1/3 text-right">
                    <button :class="{ 'text-gray-900': someCheckboxesMarked }" class="pr-8 text-gray-500" @click="clearAllCheckboxesAction">Clear all</button>
                  </div>
                </div>
                <hr class="border-gray-500 mt-2 mx-4">
              </div>
              <div class="min-w-1/3 mt-16">
                <div class="mt-4 md:p-2" v-for="(value, name) in categories" :key="name.id">
                  <MenuButtonMobile
                    v-bind:button="value"
                  ></MenuButtonMobile>
                  <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
                </div>
              </div>
              <div class="inset-x-0 bottom-0 text-center">
                <button class="p-8 text-2xl" @click="showResults">Show Results</button>
              </div>
            </div>
          </transition>
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
      'someCheckboxesMarked',
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