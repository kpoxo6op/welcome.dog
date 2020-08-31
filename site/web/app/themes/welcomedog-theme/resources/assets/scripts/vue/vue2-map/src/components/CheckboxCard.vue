<template>
  <div class="absolute p-4 bg-white border rounded z-100040">
    <!--
      TODO:
      Error: "[vuex] do not mutate vuex store state outside mutation handlers."
      convert checkbox to component with computed props
      -->
    <!-- new -->
    <form>
      <div
        v-for="(checkbox) in checkboxProps.children"
        :key="checkbox.id"
      >
        <CheckboxToggle :checkbox="checkbox" />
      </div>
    </form>
    <div class="flex">
      <button
        class="px-2"
        @click="clearCheckboxByCardIdAction(checkboxProps.id)"
      >
        Clear
      </button>
      <button
        class="px-2"
        @click="getDogPlaces(); closeCards();"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CheckboxToggle from './CheckboxToggle.vue';

export default {
  components: {
    CheckboxToggle,
  },
  props: {
    checkboxProps: {
      type: Object,
      default: () => ({
        id: 6,
        name: 'Outdoors',
        children:
            [{
              id: 10,
              name: 'Beach',
              children: [],
              isChecked: false,
            }],
        isOpen: false,
      }),
    },
  },
  methods: {
    ...mapActions([
      'getDogPlaces',
      'closeCards',
      'clearCheckboxByCardIdAction',
    ]),
  },
};
</script>

<style>

</style>
