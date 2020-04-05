<template>
      <div>
        <h2>Map</h2>
        <div>
          <button @click="filterOpen = !filterOpen" type="button" class="sm:hidden">Filters</button>
        </div>
        <div :class="filterOpen ? 'block' : 'hidden'" class="fixed inset-0 w-full h-full bg-white z-100000 flex flex-col items-center md:static">
          <div class="flex w-10/12 justify-between">
            <button @click="filterOpen = false">X</button>
            <h6 class="text-gray-900 font-semibold">Filters</h6>
            <button>Clear all</button>
          </div>
          <hr class="border-gray-500 w-10/12 mt-2">
          <div class="mt-4">
            <div class="md:p-2" v-for="(value, name) in categories" :key="name.id">
              <MenuButton
                v-bind:button="value"
              ></MenuButton>
              <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
            </div>
            </div>
        </div>
      </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MenuButton from './MenuButton.vue'

export default {
  components: {
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
    ]),
  },
}

</script>

<style scoped>
</style>