<template>
  <div class="relative md:absolute z-100040 rounded">
    <!--
      TODO:
      Error: "[vuex] do not mutate vuex store state outside mutation handlers."
      convert checkbox to component with computed props
      -->
    <!-- new -->
    <form>
      <div v-for="(checkbox) in checkboxProps.children" :key="checkbox.id">
        <CheckboxToggle :checkbox="checkbox"></CheckboxToggle>
      </div>
    </form>
  </div>
</template>

<script>
  import CheckboxToggle from './CheckboxToggle.vue';
  export default {
    components: {
      CheckboxToggle,
    },
    props: {
      checkboxProps: {
        type: Object,
        default: () =>
        ({
          id: 6,
          name: 'Outdoors',
          children:
            [{
            id: 10,
            name: 'Beach',
            children: [],
            isChecked: false,
          }],
          isOpen: false,
        }),
      },
    },
  }
</script>

<style>

</style>