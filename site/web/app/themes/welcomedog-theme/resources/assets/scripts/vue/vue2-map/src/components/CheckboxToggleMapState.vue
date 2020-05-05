<template>
  <label :for="checkbox.id">
    <div class="mt-1">
      <input type='checkbox' class='form-checkbox h-8 w-8'
        :name="checkbox.name"
        :id="checkbox.id"
        :value="checkbox.value"
        @change="updateCheckboxState"
      >
      {{ checkbox.name + checkbox.id}}
    </div>
  </label>
</template>

<script>
 import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        value: state => {
          return state.markedCheckboxIds.includes(this.checkboxId)
        },
      }),
    },
    methods: {
      updateCheckboxState (e) {
        const mutation = e.target.checked ? 'addToChecked' : 'removeFromChecked'
        this.$store.commit(mutation, e.target.id)
      },
    },
    props: ['checkbox'],
    data() {
      return {
        checkboxId: this.checkbox.id,
      }
    },
  }
</script>
