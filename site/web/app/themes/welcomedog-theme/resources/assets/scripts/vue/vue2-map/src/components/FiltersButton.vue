<template>
    <button  @click="toggleMobileFilter" type="button" class="px-2 text-xl text-center bg-white border border-gray-900 rounded-full">Filters</button>
</template>

<script>
  export default {
    methods: {
      toggleMobileFilter() {
        this.$store.commit('toggleMobileFilter')
        console.log('toggle mobile filter from fullscreen map')
      },
    },
  }
</script>