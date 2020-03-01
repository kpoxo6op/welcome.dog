<template>
  <div class="absolute z-50 border-2 rounded bg-white">
    <div v-for="checkbox in checkboxes" :key="checkbox.id">
      <input
        type="checkbox"
        v-bind:id="checkbox.id"
        v-bind:name="checkbox.id"
        v-bind:value="checkbox.name"
      >
      <label v-bind:for="checkbox.id">{{ checkbox.name }}</label>
    </div>
    <div class="flex">
      <button class="px-2">Clear</button>
      <button class="px-2">Save</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      checkboxes: Array,
    },
    
  }
</script>

<style>

</style>