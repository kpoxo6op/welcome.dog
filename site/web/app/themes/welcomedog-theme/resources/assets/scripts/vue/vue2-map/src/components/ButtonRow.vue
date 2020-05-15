<template>
      <div>
        <!-- show on mobile screen only -->
        <!-- VISIBLE -->
        <!-- sm:hidden min-width:  640px -->
        <!-- md:hidden min-width:  768px -->
        <!-- lg:hidden min-width: 1024px -->
        <!-- xl:hidden min-width: 1280px -->
        <div class="sm:hidden">
          <div class="mt-2 text-center">
            <button @click="toggleMobileFilter" type="button" class="px-2 text-xl text-center border border-gray-900 rounded-full">Filters</button>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out transform"
            enter-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in transform"
            leave-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div v-show="filterOpen" class="fixed inset-0 flex flex-col items-center w-full h-auto overflow-auto bg-white z-100000 md:static">
              <div class="fixed w-full h-16 bg-white z-100050">
                <div class="flex items-baseline mt-4 text-2xl">
                  <div class="w-1/3">
                     <button class="w-full pl-8 text-left" @click="toggleMobileFilter">X</button>
                  </div>
                  <div class="w-1/3 text-center">
                    <h6 class="font-semibold text-gray-900">Filters</h6>
                  </div>
                  <div class="w-1/3 text-right">
                    <button :class="{ 'text-gray-900': someCheckboxesMarked }" class="pr-8 text-gray-500 whitespace-no-wrap" @click="clearAllCheckboxesAction">Clear all</button>
                  </div>
                </div>
                <hr class="mx-4 mt-2 border-gray-500">
              </div>
              <div class="mt-16 min-w-1/3">
                <div class="mt-4 md:p-2" v-for="(value, name) in categories" :key="name.id">
                  <MenuButtonMobile
                    v-bind:button="value"
                  ></MenuButtonMobile>
                  <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 w-full h-full cursor-default"></button>
                </div>
              </div>
              <div class="fixed inset-x-0 bottom-0 text-center bg-white z-100050">
                <button class="py-4 text-2xl" @click="showResults">Show Results</button>
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
            <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 w-full h-full cursor-default"></button>
          </div>
        </div>
      </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
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
    }
  },
  
  computed: {
    ...mapGetters([
      'categories',
      'someCheckboxesMarked',
    ]),

    ...mapState({
      filterOpen: state => state.mobileFilterIsOpen,
    }),
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

    toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter')
    },

    showResults() {
      this.$store.dispatch('getDogPlaces')
      this.toggleMobileFilter()
    },
  },
}

</script>

<style scoped>
</style>