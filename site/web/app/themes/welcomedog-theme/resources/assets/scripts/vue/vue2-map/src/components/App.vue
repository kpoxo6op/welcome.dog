<template>
  <div>
    <Filters></Filters>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import Filters from './Filters.vue'
export default {
  components: {
    Filters,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>