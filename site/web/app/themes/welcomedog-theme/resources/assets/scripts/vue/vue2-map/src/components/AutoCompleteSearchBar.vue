<template>
  <div>
    <p>Google AutocompleteService Component</p>
    <input
      class="border border-black"
      v-model="searchString"
      type="search"
      placeholder="City or town"
    >
    <ul>
      <li
        class="flex flex-row"
        v-for="(result, i) in searchResultsMap"
        :key="i"
        data-place-id="123"
      >
        <a :href="result.link">{{ result.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// autocompletes search string using google places autocomplete together with dog places

// - register google autocomplete service
// - get dogplaces autosuggest array
// - get results from google autocomplete
// - find matches in autosuggest array
// - combine results from google and autosugget data
// - display results into dropdown

export default {
  components: {
  },

  data() {
    return {
      searchResultsMap: [],
      searchString: '',
    };
  },

  watch: {
    searchString(newValue) {
      if (newValue) {
        const request = {
          input: this.searchString,
          componentRestrictions: { country: 'nz' },
          types: ['(cities)'],
          sessionToken: this.sessionToken,
          bounds: this.$store.state.mapBounds,
        };
        this.AutocompleteService.getPlacePredictions(request, this.getSuggestions);
      }
    },
  },

  mounted() {
    this.$loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCkY9AU1X_KFg6YoBa-OhBvOquFj9HpE9g&libraries=places')
      .then(() => {
        this.initAutocompleteService();
      })
      .catch(() => {
        console.log('cannot load google places api');
      });
  },

  methods: {
    initAutocompleteService() {
      this.AutocompleteService = new window.google.maps.places.AutocompleteService();
      this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    },

    getSuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResultsMap = [];
      } else {
        this.searchResultsMap = predictions.map((el) => ({
          id: el.place_id,
          link: null,
          title: el.description,
        }));
      }
    },
  },

};
</script>
