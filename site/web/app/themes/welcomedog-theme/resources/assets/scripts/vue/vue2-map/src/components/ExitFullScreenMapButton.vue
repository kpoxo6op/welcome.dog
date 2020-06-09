<template>
  <button @click="exitFullScreenMap" class="px-4 text-3xl text-center bg-white border border-black rounded-full">X</button>
</template>

<script>
  export default {
    methods: {
      exitFullScreenMap() {
        this.$store.commit('exitFullScreenMap')
      },
    },
  }
</script>