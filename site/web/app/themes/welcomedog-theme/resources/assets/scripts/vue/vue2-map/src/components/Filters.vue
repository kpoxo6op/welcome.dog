<template>
  <div class="w-full bg-gray-500 bg-no-repeat">
    <div class="p-4 py-6 flex flex-col flex-wrap justify-center content-left">
      <div class="m-0 p-0 text-xl text-white antialiased">
        <div v-for="topLvlCategory in topLvlCategories" :key="topLvlCategory.id">
          {{ topLvlCategory }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topLvlCategories: [],
      errors: [],
    }
  },

  created() {
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
  },
}
</script>

<style scoped>
</style>