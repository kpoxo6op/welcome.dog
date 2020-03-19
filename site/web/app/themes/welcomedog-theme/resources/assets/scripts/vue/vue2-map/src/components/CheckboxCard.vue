<template>
  <div class="absolute z-100010 border-2 rounded bg-white">
    <div v-for="(checkbox, index) in checkboxes.children" :key="checkbox.id">
      <input
        type="checkbox"
        v-bind:id="checkbox.id"
        v-bind:name="checkbox.name"
        v-bind:value="checkbox.id"
        v-model="checkboxes.children[index].isChecked"
      >
      <label v-bind:for="checkbox.id">{{ checkbox.name }}</label>
    </div>
    <div class="flex">
      <button class="px-2" @click="clearCheckboxes">Clear</button>
      <!--[wrap into object] -->
      <button class="px-2" @click="updateCheckboxes([checkboxes])">Save</button>
    </div>
  </div>
</template>

<script>
  import {mapActions } from 'vuex';
  export default {
    props: {
      checkbox: {
        type: Object,
        //type: Array, Invalid prop: type check failed for prop "checkboxProps". Expected Array, got Object
        default: () =>
        ({
          id: null,
          name: 'Unknown',
          children:
            [{
            id: null,
            name: 'Unknown',
            children: [],
            isChecked: false,
          }],
          isOpen: false,
        }),
      },
    },

    data() {
      return {
         //properties still updated
         //checkboxes: JSON.parse(JSON.stringify(this.checkbox)),

         //this.checkbox.map is not a function
         //checkboxes: this.checkbox.map(el => {return { ...el, } }),
         
         //trying this deep copy
         //https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
         checkboxes: this.deepCopy(this.checkbox),
      }
    },

    methods: {
      ...mapActions([
        'getDogPlaces',
        'updateCheckboxes',
      ]),

      clearCheckboxes: function () {
        this.checkboxes = this.checkboxes.map(el => {
          return {
            ...el,
            isChecked: false,
          }
        })
      },

      deepCopy: function (inObject) {
        let outObject, value, key
        if(typeof inObject !== 'object' || inObject === null) {
          return inObject // Return the value if inObject is not an object
        }
        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {}
        for (key in inObject) {
          value = inObject[key]
          // Recursively (deep) copy for nested objects, including arrays
          outObject[key] = (typeof value === 'object' && value !== null) ? this.deepCopy(value) : value
        }
        return outObject
      },
    },
  }
</script>

<style>

</style>