<template>
  <form>
    <vue-autosuggest
      :suggestions="suggestions"
      :input-props="inputProps"
      :section-configs="sectionConfigs"
      :render-suggestion="renderSuggestion"
      :get-suggestion-value="getSuggestionValue"
      ref="autocomplete"
    />

    <div
      id="map"
      style="height: 300px;"
    />
  </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

let googleMapPromise = null;
let map = null;
let placeService = null;
let autocompleteService = null;
let timeout = null;
let marker = null;

export default {
  name: 'PlacePicker',
  props: ['query'],
  data() {
    return {
      GOOGLE_API_KEY: '<PUT_YOUR_KEY>',
      selected: '',
      suggestions: [],
      sectionConfigs: {
        googleSuggest: {
          limit: 6,
          label: 'Suggestions',
          onSelected: (selected) => {
            this.fetchResults(selected.item, '');
            // https://github.com/Educents/vue-autosuggest/issues/52
            this.$refs.autocomplete.listeners.click();
          },
        },
        travelopy: {
          limit: 6,
          label: 'Travelopy',
          onSelected: (selected) => {
            this.selected = selected;
          },
        },
        google: {
          limit: 6,
          label: 'Google',
          onSelected: (selected) => {
            this.selected = selected;
          },
        },
      },
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.fetchResults,
        placeholder: 'Search places',
        initialValue: this.query,
      },
    };
  },
  watch: {
    selected(value) {
      if (value) {
        const { item } = value;
        if (item.location) {
          if (!marker) {
            marker = new google.maps.Marker({ position: item.location, map, title: item.name });
          } else {
            marker.setPosition(item.location);
            marker.setTitle(item.name);
          }

          map.panTo(item.location);
        } else {
          this.$toasted.show('Selection had no location');
        }
      }
    },
    fetchResults(val) {
      this.selected = null;

      let delay = 300;
      const len = val.length;
      if (len == 0) {
        this.suggestions = [];
        return;
      }
      if (len == 1) {
        delay = 1000;
      } else if (len <= 3) {
        delay = 700;
      } else if (len <= 5) {
        delay = 500;
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // hack to maintain position
        this.suggestions = [
          { name: 'google', data: null },
          { name: 'travelopy', data: null },
          { name: 'googleSuggest', data: null },
        ];

        axios.get(`/your_autocomplete_rest_api?q=${val}`)
          .then((response) => {
            const results = response.data;

            if (results.length === 0) return;

            const newResults = results.map((item) => {
              // TODO: perform your own mapping here

              let { name } = item;
              const alt_names = [];
              if (item.native_name) name += ` (${item.native_name})`;

              let location = null;
              if (item.geo) {
                const latlng = item.geo.split(', ');
                location = new google.maps.LatLng(latlng[0], latlng[1]);
              }

              return {
                id: item.id,
                type: 'place',
                name,
                address: item.address,
                location,
                place_type: item._item_type,
              };
            });

            const suggestion = { name: 'travelopy', data: newResults };
            const index = this.suggestions.findIndex((x) => x.name === 'travelopy');
            if (index === -1) this.suggestions.push(suggestion);
            else Vue.set(this.suggestions, index, suggestion);
          })
          .catch((error) => {
            // const message = lua.util.getErrorMessage(error)
            // this.$toasted.error(message)
          });

        const request = {
          query: val,
          fields: ['place_id', 'name', 'formatted_address', 'icon', 'geometry'],
          // locationBias: null,
        };

        placeService.findPlaceFromQuery(request, (results, status) => {
        // placeService.textSearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // raw is used by new_api.py for new place creation
            const newResults = results.map((item) => ({
              id: item.place_id, type: 'google_place', name: item.name, address: item.formatted_address, location: item.geometry.location, place_icon: item.icon, raw: item,
            }));

            const suggestion = { name: 'google', data: newResults };
            const index = this.suggestions.findIndex((x) => x.name === 'google');
            if (index === -1) this.suggestions.push(suggestion);
            else Vue.set(this.suggestions, index, suggestion);
          }
        });

        const autocompleteRequest = {
          input: val,
        };

        autocompleteService.getPlacePredictions(autocompleteRequest, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            const newResults = results.map((item) => (item.description));

            const suggestion = { name: 'googleSuggest', data: newResults };
            const index = this.suggestions.findIndex((x) => x.name === 'googleSuggest');
            if (index === -1) this.suggestions.push(suggestion);
            else Vue.set(this.suggestions, index, suggestion);
          }
        });
      }, delay);
    },
    renderSuggestion(suggestion) {
      const { item } = suggestion;
      if (suggestion.name === 'travelopy') {
        return (
          <div>
            <div class="float-right text-secondary">{item.place_type}</div>
            <div>{item.name}</div>
            <small class="text-secondary">{item.address}</small>
          </div>
        );
      } if (suggestion.name === 'google') {
        return (
          <div>
            <img class="float-right" style="max-width: 18px;" src={item.place_icon} />
            <div>{item.name}</div>
            <small class="text-secondary">{item.address}</small>
          </div>
        );
      }
      // assume this is string
      return item;
    },
    getSuggestionValue(item) {
      if (item.name == 'travelopy' || item.name == 'google') {
        return item.item.name;
      }
      return item.item;
    },
  },
  created() {
    googleMapPromise = loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_API_KEY}&libraries=places`);
  },
  mounted() {
    googleMapPromise.then(() => {
      const mapCenter = new google.maps.LatLng(-33.8617374, 151.2021291);

      map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15,
      });
      marker = null;

      placeService = new google.maps.places.PlacesService(map);

      autocompleteService = new google.maps.places.AutocompleteService();
    });
  },
};
</script>
