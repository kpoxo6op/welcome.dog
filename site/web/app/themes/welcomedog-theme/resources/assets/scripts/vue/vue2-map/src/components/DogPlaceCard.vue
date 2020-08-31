<template>
  <!-- <a v-bind:href="card.link">
  <div class="w-3/4 max-w-s flex-col flex items-center">
    <div class="mt-4 overflow-hidden rounded shadow-lg">
      <img class="w-full" v-bind:src=card.imgURL v-bind:alt="card.alt">
    </div>
    <div class="px-4 py-2">
      <div class="text-xl font-bold text-gray-800">{{card.title}}</div>
      <div class="mb-2 text-gray-600">{{card.category}}</div>
    </div>
  </div>
</a> -->
  <a :href="card.link">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mt-8 mb-4">
      <img
        class="w-full"
        :src="card.imgURL"
        :alt="card.alt"
      >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ card.title }}</div>
        <p class="text-gray-700 text-base">
          {{ card.category }}
        </p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        id: 0,
        title: 'No Title',
        link: '#',
        category: 'Unknown dogplace category',
        alt: 'Dog place image',
        imgURL: 'https://i.imgur.com/2D8GXzj.jpg',
      }),
    },
  },
};
</script>
