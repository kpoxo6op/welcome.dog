<template>
<div class="w-3/4 max-w-sm">
  <div class="mt-4 overflow-hidden rounded shadow-lg">
    <img class="w-full" v-bind:src=card.imgURL v-bind:alt="card.alt">
  </div>
  <div class="px-4 py-2">
    <div class="text-xl font-bold text-gray-800">{{card.title}}</div>
    <div class="mb-2 text-gray-600">{{card.category}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        id:    0,
        title: 'No Title',
        link:  '#',
        category: 'Unknown category',
        alt:      'Dog place image',
        imgURL:   'https://i.imgur.com/2D8GXzj.jpg',
      }),
    },
  },
}
</script>