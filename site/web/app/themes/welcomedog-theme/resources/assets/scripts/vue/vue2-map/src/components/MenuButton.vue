<template>
  <div>
    <div>
      <button @click="openCard(id)" class="relative z-10">
        {{ name }}
      </button>
    </div>
    <CheckboxMenu v-if="isOpen"
      v-bind:checkboxes=children
    ></CheckboxMenu>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import CheckboxMenu from './CheckboxMenu.vue'
  export default {
    components: {
      CheckboxMenu,
    },

    props: {
      id: Number,
      name: String,
      children: Array,
      isOpen: Boolean,
    },

    methods: {
      ...mapActions([
        'openCard',
      ]),
    },
  }
</script>

<style>

</style>