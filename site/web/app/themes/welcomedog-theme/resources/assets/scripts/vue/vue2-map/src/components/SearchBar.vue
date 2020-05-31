<template>
<div v-show="!mobileMapIsFullSreen" class="fixed flex flex-row w-full h-16 bg-white border-b border-gray-400 opacity-100 z-100050">
  <div class="flex flex-row items-center">
    <div class="mx-3">
      <button class="text-gray-400 border border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/>
        </svg>
      </button>
    </div>
    <div class="relative mx-auto text-gray-600">
      <input class="h-10 px-5 pr-16 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
        type="search" name="search" placeholder="Search">
      <button type="submit" class="absolute top-0 right-0 mt-3 mr-4">
        <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
          width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    data() {
      return {
        // mobileMapIsFullSreen: false,
      }
    },
    
    computed: {
      ...mapState({
        mobileMapIsFullSreen: state => state.mobileMapIsFullSreen,
      }),
    },
  }
</script>