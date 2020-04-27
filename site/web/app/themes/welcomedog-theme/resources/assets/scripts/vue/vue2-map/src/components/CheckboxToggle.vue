<template>
  <div class="mt-1">
    <label :for="checkbox.id">
      <input type='checkbox' class='form-checkbox h-8 w-8'
        :name="checkbox.name"
        :id="checkbox.id"
        :value="checkbox.value"
        v-model="value"
      >
      {{ checkbox.name }}
    </label>
  </div>
</template>

<script>
  export default {
    computed: {
      value: {
        get() {
          return this.$store.state.markedCheckboxIds.includes(this.checkbox.id)
        },
        set(val) {
          const mutation = val ? 'addToChecked' : 'removeFromChecked'
          this.$store.commit(mutation, this.checkbox.id)
        },
      },
    },
    props: ['checkbox'],
  }
</script>
