<template>
      <div>
        <h2>This is our map</h2>
        <div class="flex">
          <div class="p-2" v-for="(value, name) in categories" :key="name.id">
            <MenuButton
              v-bind="value"
            ></MenuButton>
            <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed z-100000 inset-0 h-full w-full cursor-default"></button>
            <!-- <button v-if="value.isOpen" @click="closeCards" tabindex="-1" class="fixed z-100000 inset-0 h-full w-full bg-black opacity-25 cursor-default"></button> -->
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