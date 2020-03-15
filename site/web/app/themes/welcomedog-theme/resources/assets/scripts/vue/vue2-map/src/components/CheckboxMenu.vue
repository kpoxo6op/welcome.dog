<template>
  <div class="absolute z-100010 border-2 rounded bg-white">
    <div v-for="(checkbox, index) in checkboxes" :key="checkbox.id">
      <input
        type="checkbox"
        v-bind:id="checkbox.id"
        v-bind:name="checkbox.name"
        v-bind:value="checkbox.id"
        v-model="checkboxes[index].isChecked"
      >
      <label v-bind:for="checkbox.id">{{ checkbox.name }}</label>
    </div>
    <div class="flex">
      <button class="px-2" @click="clearCheckboxes">Clear</button>
      <button class="px-2" @click="setFilters(checkboxes)">Save</button>
    </div>
  </div>
</template>

<script>
  import {mapActions } from 'vuex';
  export default {
    props: {
      checkboxProps: {
        type: Array,
        default: () => [{
          id: null,
          name: 'Unknown',
          children: [],
          isChecked: false,
        }],
      },
    },

    data() {
      //The prop is used to pass in an initial value; the child component wants to use it as a local data property afterwards.
      return {
        //mutates parent checkboxProps
        //checkboxes: this.checkboxProps,
        //checkboxes: [...this.checkboxProps],
        //checkboxes: {...this.checkboxProps},
        //checkboxes: this.checkboxProps.slice(),
        //checkboxes: Array.from(this.checkboxProps),
        //works
        //store and update these in store?
        checkboxes: this.checkboxProps.map(el => {
          return {
            ...el,
          }
        }),
      }
    },
    //computed - The prop is passed in as a raw value that needs to be transformed.
    //computed() {},

    methods: {
      ...mapActions([
        'getDogPlaces',
        'setFilters',
      ]),

      clearCheckboxes: function () {
      this.checkboxes = this.checkboxes.map(el => {
        return {
          ...el,
          isChecked: false,
        }
      })
      },
    },
  }
</script>

<style>

</style>