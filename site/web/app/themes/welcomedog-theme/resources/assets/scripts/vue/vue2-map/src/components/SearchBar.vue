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
        v-for="(result, i) in searchResults"
        :key="i"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchBarBackButton from './SearchBarBackButton.vue';
import SearchBarMagnGlassIcon from './SearchBarMagnGlassIcon.vue';

export default {
  components: {
    SearchBarBackButton,
    SearchBarMagnGlassIcon,
  },

  props: {
    searchResults: {
      type: Array,
      default: () => ([
        'Auckland',
        'Rotorua',
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
