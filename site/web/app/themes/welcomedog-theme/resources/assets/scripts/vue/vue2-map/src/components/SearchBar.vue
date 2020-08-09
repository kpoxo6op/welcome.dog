<template>
  <div v-show="!mobileMapIsFullSreen" class="z-100050 bg-white fixed w-full">
    <div class="flex justify-center content-center mx-6">
      <form role="search" method="get" class="relative my-4 border-gray-400 border rounded-full overflow-hidden" action="http://welcomedog.test/">
        <div class="absolute pl-3 inset-y-0 flex items-center">
          <svg class="text-gray-700 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" class="w-64 ml-10 py-2 font-light" placeholder="Auckland" value="" name="s">
      </form>
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