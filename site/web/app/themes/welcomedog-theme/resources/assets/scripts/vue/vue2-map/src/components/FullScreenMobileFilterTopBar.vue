<template>
  <div class="fixed w-full h-16 bg-white z-100050">
    <div class="flex items-baseline mt-4 text-2xl">
      <!-- Close Button -->
      <div class="w-1/3">
        <button
          class="w-full pl-8 text-left"
          @click="toggleMobileFilter"
        >
          X
        </button>
      </div>
      <!-- Filters Title -->
      <div class="w-1/3 text-center">
        <h6 class="font-semibold text-gray-900">
          Filters
        </h6>
      </div>
      <!-- Clear All button -->
      <div class="w-1/3 text-right">
        <button
          :class="{ 'text-gray-900': someCheckboxesMarked }"
          class="pr-8 text-gray-500 whitespace-no-wrap"
          @click="clearAllCheckboxesAction"
        >
          Clear all
        </button>
      </div>
    </div>
    <hr class="mx-4 mt-2 border-gray-500">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'someCheckboxesMarked',
    ]),
  },
  methods: {
    ...mapActions([
      'clearAllCheckboxesAction',
    ]),
    toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter');
    },
  },
};
</script>
