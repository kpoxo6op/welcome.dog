<template>
  <div
    class="input-field"
    :class="{ 'is-focused': isFocused, 'has-value': value !== '' }"
  >
    <label>{{ label }}</label>
    <input
      type="text"
      :name="name"
      v-model="value"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="getAddress"
      @keydown="selectItem"
    >
    <div
      class="error"
      :class="{ 'is-visible': error !== '' }"
    >
      {{ error }}
    </div>
    <div
      class="dropdown"
      :class="{ 'is-visible': isFocused }"
    >
      <div
        class="loader1"
        v-if="isLoading"
      >
        <div class="bounce1" />
        <div class="bounce2" />
        <div class="bounce3" />
      </div>
      <div
        class="dropdown-item"
        v-for="(item, index) in items"
        :class="{ 'is-selected': isSelected === index }"
        @mouseover="onMouseover(index)"
        @click="setItem(index)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      error: '',
      isFocused: false,
      isLoading: false,
      isSelected: -1,
      value: this.default,
    };
  },
  props: {
    default: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    getAddress() {
      this.error = '';
      this.items = [];
      this.isLoading = true;
      const search = new google.maps.places.AutocompleteService();
      const request = {
        input: this.value,
        location: new google.maps.LatLng({ lat: -2.18333333, lng: -79.883333 }),
        radius: 10000,
        componentRestrictions: { country: 'ec' },
      };
      if (this.value !== '') {
        search.getPlacePredictions(request, (results) => {
          if (results !== null) {
            this.items = [];
            _.forEach(results, (address, key) => {
              this.items.push({
                label: address.description,
                value: address.description,
                place_id: address.place_id,
              });
            });
          }
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    },
    getPlaceIdCoords(placeId) {
      const geocoder = new google.maps.Geocoder();
      const myComponent = this;
      geocoder.geocode({ placeId }, (results, status) => {
        const coords = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
        myComponent.$parent.$refs.map.marker.setPosition(coords);
        myComponent.$parent.$refs.map.map.panTo(coords);
      });
    },
    onMouseover(index) {
      this.isSelected = index;
    },
    selectItem(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.isSelected !== -1) {
          this.setItem(this.isSelected);
        } else if (this.isSelected === -1 && this.items.length) {
          this.setItem(0);
        }
      } else if (event.keyCode === 27) {
        event.preventDefault();
        document.querySelector(`input[name="${this.name}"]`).blur();
      } else if (event.keyCode === 38) {
        event.preventDefault();
        if (this.isSelected >= 1) this.isSelected -= 1;
      } else if (event.keyCode === 40) {
        event.preventDefault();
        if (this.isSelected < this.items.length - 1) this.isSelected += 1;
      }
    },
    setItem(index) {
      const selectedItem = this.items[index];
      this.isSelected = 0;
      this.items = [selectedItem];
      this.value = selectedItem.label;
      document.querySelector(`input[name="${this.name}"]`).blur();
      this.getPlaceIdCoords(selectedItem.place_id);
    },
  },
};
</script>
