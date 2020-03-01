<template>
  <div>
    <div>
      <button @click="isOpen = !isOpen" class="relative z-10">
        {{ name }}
      </button>
    </div>
    <CheckboxMenu v-if="isOpen"
      v-bind:checkboxes=children
    ></CheckboxMenu>
  </div>
</template>

<script>
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

    data() {
      return {
        childrenHardcoded: [
          {
            'id': 19,
            'name': 'Food',
            'children': [],
          },
          {
            'id': 17,
            'name': 'Grooming',
            'children': [],
          },
          {
            'id': 20,
            'name': 'Kennel',
            'children': [],
          },
          {
            'id': 18,
            'name': 'Vets',
            'children': [],
          },
        ],
      }
    },
  }
</script>

<style>

</style>