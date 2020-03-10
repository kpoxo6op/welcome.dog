<template>
      <div>
        <h2>This is our map</h2>
        <div class="flex">
          <div class="p-2" v-for="(value, name) in categories" :key="name.id">
            <MenuButton
              v-bind="value"
            ></MenuButton>
          <button @click="closeCards" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default z-0"></button>
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