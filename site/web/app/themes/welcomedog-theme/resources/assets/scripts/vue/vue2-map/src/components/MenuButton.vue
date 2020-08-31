<template>
  <div>
    <button
      @click="toggleCard(button.id)"
      class="relative w-full z-100010 text-center border rounded-full"
    >
      {{ button.name }}
    </button>
    <CheckboxCard
      v-if="button.isOpen"
      :checkbox-props="button"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CheckboxCard from './CheckboxCard.vue';

export default {
  components: {
    CheckboxCard,
  },
  // TODO: use computed properties
  props: {
    button: {
      type: Object,
      default: () => ({
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
};
</script>

<style>

</style>
