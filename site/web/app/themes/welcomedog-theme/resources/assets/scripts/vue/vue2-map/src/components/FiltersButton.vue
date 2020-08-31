<template>
  <!-- <button @click="toggleMobileFilter"
            :class="{'border-gray-700 text-gray-600': someCheckboxesMarked}"
            class="px-2 text-xl text-center bg-white border border-gray-900 rounded-full">
            type="button"
            {{ labelText }}
    </button> -->

  <button
    @click="toggleMobileFilter"
    :class="{'border-gray-700 text-gray-600': someCheckboxesMarked}"
    class="border border-gray-900 text-gray-800 px-2 text-center rounded-full bg-white"
    type="button"
  >
    {{ labelText }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters([
      'someCheckboxesMarked',
      'markedCheckboxesCount',
    ]),

    labelText() {
      if (this.someCheckboxesMarked) {
        return `Filters · ${this.markedCheckboxesCount}`;
      }
      return 'Filters';
    },
  },

  methods: {
    toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter');
    },
  },
};
</script>
