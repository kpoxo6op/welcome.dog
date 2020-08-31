<template>
  <div>
    <div>
      <button
        class="relative w-full text-left z-100010 font-semibold"
      >
        {{ button.name }}
      </button>
    </div>
    <CheckboxCardMobile :checkbox-props="button" />
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
