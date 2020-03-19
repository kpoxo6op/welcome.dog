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
         // deep clone https://www.codementor.io/@junedlanja/copy-javascript-object-right-way-ohppc777d
         checkboxes: JSON.parse(JSON.stringify(this.checkbox)),
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
    },
  }
</script>

<style>

</style>