<template>
  <div>
    <div>Frontpage content (map is not loaded)</div>
    <AutoCompleteSearchBar />
    <router-link
      to="/search?category=Beach"
    >
      router link to Map component ->
    </router-link>
    <!-- <div>title</div>
    <div>subtitle</div>
    <div>
      card row
      <router-link
        to="/search?category=Beach"
        class="text-3xl"
      >
        Beaches card
      </router-link>
    </div>
    <div>Destinations</div>
    <div>Submit new place</div>
    <div>footer</div> -->
  </div>
</template>

<script>
import AutoCompleteSearchBar from './AutoCompleteSearchBar.vue';

export default {
  components: {
    AutoCompleteSearchBar,
  },

  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {

  },

};
</script>
