<template>
  <div class="relative rounded z-100040">
    <form>
      <div
        v-for="(checkbox) in checkboxProps.children"
        :key="checkbox.id"
      >
        <CheckboxToggle :checkbox="checkbox" />
      </div>
    </form>
  </div>
</template>

<script>
import CheckboxToggle from './CheckboxToggle.vue';

export default {
  components: {
    CheckboxToggle,
  },
  props: {
    checkboxProps: {
      type: Object,
      default: () => ({
        id: 0,
        name: 'Undefined dogplace category',
        children:
            [{
              id: -1,
              name: 'Undefined dogplace 1',
              children: [],
              isChecked: false,
            },
            {
              id: -2,
              name: 'Undefined dogplace 2',
              children: [],
              isChecked: false,
            }],
        isOpen: false,
      }),
    },
  },
};
</script>

<style>

</style>
