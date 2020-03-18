<template>
  <div>
    <div>
      <button @click="toggleCard(id)" class="relative z-100010 mx-2 border border-gray-900 rounded-full w-full text-gray-900">
        {{ name }}
      </button>
    </div>
    <CheckboxCard v-if="isOpen"
      v-bind:checkboxProps=$props
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

    props: {
      id: Number,
      name: String,
      children: Array,
      isOpen: Boolean,
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