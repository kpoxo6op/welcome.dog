<template>
  <label
    :for="checkbox.id"
    @click="toggleURLQueryString"
  >
    <div class="mt-1">
      <input
        type="checkbox"
        class="w-8 h-8 form-checkbox"
        :name="checkbox.name"
        :id="checkbox.id"
        :value="checkbox.value"
        v-model="value"
      >
      {{ checkbox.name }}
    </div>
  </label>
</template>

<script>
export default {
  props: {
    checkbox: {
      type: Object,
      default: () => ({
        id: -3,
        name: 'Undefined dogplace 3',
        children: [],
        isChecked: false,
      }),
    },
  },
  computed: {
    value: {
      get() {
        return this.$store.state.markedCheckboxIds.includes(this.checkbox.id);
      },
      set(val) {
        const mutation = val ? 'addToChecked' : 'removeFromChecked';
        this.$store.commit(mutation, this.checkbox.id);
      },
    },
  },

  methods: {
    toggleURLQueryString() {
      console.log('toggle URL query string');
    },
  },
};
</script>
