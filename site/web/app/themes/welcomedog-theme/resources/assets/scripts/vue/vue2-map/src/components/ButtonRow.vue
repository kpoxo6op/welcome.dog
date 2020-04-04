<template>
      <div>
        <h2>Map</h2>
        <button @click="filterOpen = !filterOpen" type="button" class="sm:hidden">Filters</button>
        <div class="md:flex">
          <nav :class="filterOpen ? 'block' : 'hidden'" class="md:p-2" v-for="(value, name) in categories" :key="name.id">
            <MenuButton
              v-bind:button="value"
            ></MenuButton>
            <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed z-100000 inset-0 h-full w-full cursor-default"></button>
            <!-- <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed z-100000 inset-0 h-full w-full bg-black opacity-25 cursor-default"></button> -->
          </nav>
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