<template>
  <div>
    <button @click="toggleCard(button.id)" class="relative w-full text-left z-100010 sm:text-center sm:mx-2 sm:border sm:border-gray-900 sm:rounded-full">
      {{ button.name }}
    </button>
    <CheckboxCard v-if="button.isOpen"
      v-bind:checkboxProps=button
    ></CheckboxCard>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import CheckboxCard from './CheckboxCard.vue'
  export default {
    components: {
      CheckboxCard,
    },
    //TODO: use computed properties
    props: {
      button: {
        type: Object,
        default: () =>
        ({
          id: null,
          name: 'Unknown',
          children:
            [{
            id: null,
            name: 'Unknown',
            children: [],
            isChecked: false,
          }],
          isOpen: false,
        }),
        required: true,
      },
    },
    methods: {
      ...mapActions([
        'toggleCard',
      ]),
    },
  }
</script>

<style>

</style>