<template>
  <div>
    <transition
      enter-active-class="transition duration-100 ease-out transform"
      enter-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in transform"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="filterOpen"
        class="fixed inset-0 flex flex-col items-center w-full h-auto overflow-auto bg-white z-100050"
      >
        <FullScreenMobileFilterTopBar />
        <div class="pb-32 mt-16 min-w-1/3">
          <div
            class="mt-4"
            v-for="(value, name) in categories"
            :key="name.id"
          >
            <MenuButtonMobile
              :button="value"
            />
          </div>
        </div>
        <div class="fixed inset-x-0 bottom-0 h-20 bg-white flex flex-col justify-center border-t border-gray-600 rounded-t-none z-100050">
          <div class="relative transition duration-100 ease-in-out text-gray-800 hover:bg-black hover:text-white border-gray-700 border-2 m-4 rounded-lg">
            <button
              class="w-full py-2 text-2xl"
              @click="showResults"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters/* , mapActions */ } from 'vuex';
import MenuButtonMobile from './MenuButtonMobile.vue';
import FullScreenMobileFilterTopBar from './FullScreenMobileFilterTopBar.vue';

export default {
  components: {
    MenuButtonMobile,
    FullScreenMobileFilterTopBar,
  },

  computed: {
    ...mapGetters([
      'categories',
      // 'someCheckboxesMarked',
    ]),
    ...mapState({
      filterOpen: (state) => state.mobileFilterIsOpen,
    }),
  },
  methods: {
    // ...mapActions([
    //   'clearAllCheckboxesAction',
    // ]),
    toggleMobileFilter() {
      this.$store.commit('toggleMobileFilter');
    },
    showResults() {
      this.$store.dispatch('getDogPlaces');
      this.toggleMobileFilter();
    },
  },
};
</script>
