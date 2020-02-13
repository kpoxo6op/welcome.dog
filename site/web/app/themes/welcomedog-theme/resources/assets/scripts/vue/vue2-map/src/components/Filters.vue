<template>
      <div>
        <h2>This is our map</h2>
        <div class="flex">
          <div class="px-2 py-2" v-for="topLvlCategory in topLvlCategories" :key="topLvlCategory.id">
            {{ topLvlCategory }}
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import {mapGetters } from 'vuex';

export default {
  data() {
    return {
      errors: [],
    }
  },
  
  computed: {
    ...mapGetters({
      topLvlCategories: 'topLvlCategoryNames',
    })
  },

  created() {
    this.$store.dispatch('getAllCategoriesSync')
  },
}
</script>

<style scoped>
</style>