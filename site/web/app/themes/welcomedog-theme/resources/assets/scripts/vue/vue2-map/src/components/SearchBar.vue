<template>
  <div class="z-100050 bg-white fixed w-full">
    <div class="flex justify-center content-center mx-6">
      <SearchBarBackButton />
      <form
        role="search"
        method="get"
        class="relative my-4 border-gray-400 border rounded-full overflow-hidden"
        action="http://welcomedog.test/"
      >
        <SearchBarMagnGlassIcon />
        <input
          type="search"
          class="w-64 ml-10 py-2 font-light"
          placeholder="Auckland"
          @input="$emit('input', $event.target.value)"
          name="s"
        >
      </form>
    </div>
    <ul>
      <li
        class="flex flex-row"
        v-for="(result, i) in searchResults"
        :key="i"
        data-place-id="123"
      >
        <SearchResultsLocationIcon class="mx-1" />
        <a :href="result.link">{{ result.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchBarBackButton from './SearchBarBackButton.vue';
import SearchBarMagnGlassIcon from './SearchBarMagnGlassIcon.vue';
import SearchResultsLocationIcon from './SearchResultsLocationIcon.vue';

export default {
  components: {
    SearchBarBackButton,
    SearchBarMagnGlassIcon,
    SearchResultsLocationIcon,
  },

  props: {
    searchResults: {
      type: Array,
      default: () => ([
        { id: 'ChIJ--acWvtHDW0RF5miQ2HvAAU', link: null, title: 'Auckland, New Zealand' },
        { id: 43, link: 'http://welcomedog.test/dogplaces/coromandel-place/', title: 'coromandel place' },
      ]),
    },
  },

  computed: {
    ...mapState({
      mobileMapIsFullSreen: (state) => state.mobileMapIsFullSreen,
    }),
  },
};
</script>
