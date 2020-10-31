<template>
  <router-link to="/search?category=Beach">
    <div class="ml-6 sm:ml-0 sm:mr-4 mb-4 max-w-sm rounded-lg overflow-hidden shadow-lg">
      <img
        class="w-full"
        :src="imgURL"
        alt="card"
      >
      <div class="px-6 py-4 h-40">
        <div class="font-bold text-xl mb-2">
          Beaches
        </div>
        <p class="text-gray-700 text-base">
          Nearby beaches where dogs are welcome.
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      imgURL: 'https://place-hold.it/800x494?text=Happy%20Dog&fontsize=23',
    };
  },

};
</script>
