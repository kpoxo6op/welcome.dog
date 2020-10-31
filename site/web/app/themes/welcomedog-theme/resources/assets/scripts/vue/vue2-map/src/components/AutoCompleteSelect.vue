<template>
  <div>
    <v-select
      class="style-chooser w-full max-w-sm"
      :options="options"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // selected: '',
      options: ['foo',
        'bar',
        'baz'],
    };
  },

  // created() {
  //   this.$gmapApiPromiseLazy({}).then(() => {
  //     this.service = new window.google.maps.places.AutocompleteService();
  //   });
  // },

  // methods: {
  //   setSelected(val) {
  //     this.$store.dispatch('setSelected', val);
  //     if (this.$route.path !== '/map') {
  //       this.$router.push('map');
  //     }
  //   },

  //   fetchOptions(searchText) {
  //     this.request = {
  //       input: searchText,
  //       types: ['(cities)'],
  //     };
  //     this.service.getPlacePredictions(this.request, this.getSuggestions);
  //   },

  //   getSuggestions(predictions, status) {
  //     if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
  //       this.options = [];
  //       return;
  //     }
  //     this.options = predictions.map((prediction) => ({
  //       description: prediction.description,
  //       place_id: prediction.place_id,
  //     }));
  //   },
  // },
};
</script>
<style>
.style-chooser .vs__dropdown-toggle
{
  border: 1;
  padding-bottom: 6px;
  padding-top: 6px;
  border-radius: 20px;
}

</style>
