<template>
  <div>
    <div>
      <button @click="toggleCard(button.id)" class="relative z-100010 md:mx-2 md:border md:border-gray-900 md:rounded-full w-full">
        {{ button.name }}
      </button>
    </div>
    <CheckboxCard v-if="button.isOpen"
      v-bind:checkbox=button
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
    //Object
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