<template>
      <div>
        <h2>This is our map</h2>
        <div class="flex">
          <div class="p-2" v-for="(value, name) in categoriesParentChild" :key="name.id">
            <MenuButton
              v-bind="value"
            ></MenuButton>
          </div>
        </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex';
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
    ...mapGetters({
      categoriesParentChild: 'allCategoriesParentChild',
    }),
  },

  created() {
    this.$store.dispatch('getAllCategoriesSync')
  },
}

</script>

<style scoped>
</style>