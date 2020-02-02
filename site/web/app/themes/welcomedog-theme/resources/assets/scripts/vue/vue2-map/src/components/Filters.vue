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
import {mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      //topLvlCategories: [],
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      topLvlCategories: 'topLvlCategoryNames',
    })
  },

  // do we have to map actions?
  methods: mapActions({
    //getAllcategories: 'getAllcategories',
  }),

  created() {
    /*
    //TODO: make it async
    axios.get('http://welcomedog.test/wp-json/wp/v2/dogplace-type?per_page=100')
    .then(response => {
      // JSON responses are automatically parsed as javascript object.
      this.topLvlCategories = response.data
      .filter(category => category.parent == 0)
      .map(category => category.name);
      console.log( this.topLvlCategories );
    })
    .catch(e => {
      this.errors.push(e)
    })
    */
    this.$store.dispatch('getAllCategories')
  },
}
</script>

<style scoped>
</style>