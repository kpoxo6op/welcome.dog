<template>
  <div v-show="!mobileMapIsFullSreen" class="fixed top-0 flex w-full z-100050 h-16 bg-white">
    <div class="w-2/12 relative">
      <button class="text-gray-600 border-transparent rounded-full focus:outline-none absolute inset-y-0 right-0 pr-2" aria-label="Back">
        <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/>
        </svg>
      </button>
    </div>
    <form role="search" method="get" class="flex w-8/12 my-2 border-gray-400 border rounded-full overflow-hidden max-w-sm" action="">
      <div class="absolute pl-3 inset-y-0 flex items-center">
        <svg class="text-gray-700 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input type="search" class="w-64 ml-10 font-light" placeholder="Auckland" value="" name="s" />
    </form>
    <div class="w-2/12"></div>
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