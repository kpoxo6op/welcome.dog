<template>
  <div>
    <div>
      <button
        class="relative z-100010 text-left md:text-center md:mx-2 md:border md:border-gray-900 md:rounded-full w-full"
      >
        {{ button.name }}
      </button>
    </div>
    <CheckboxCardMobile v-bind:checkboxProps="button"></CheckboxCardMobile>
  </div>
</template>

<script>
import CheckboxCardMobile from './CheckboxCardMobile.vue';
export default {
  components: {
    CheckboxCardMobile,
  },
  props: {
    button: {
      type: Object,
      default: () => ({
        id: null,
        name: 'Unknown',
        children: [
          {
            id: null,
            name: 'Unknown',
            children: [],
            isChecked: false,
          },
        ],
        isOpen: false,
      }),
      required: true,
    },
  },
};
</script>

<style></style>
