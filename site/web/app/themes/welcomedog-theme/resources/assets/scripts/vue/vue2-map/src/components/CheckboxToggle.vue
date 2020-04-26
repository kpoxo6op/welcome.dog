<template>
  <div>
    <input type='checkbox'
      :name="checkbox.name"
      :id="checkbox.id"
      :value="checkbox.value"
      v-model="value"
    >
    <label :for="checkbox.id">{{ checkbox.name }}</label>
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
