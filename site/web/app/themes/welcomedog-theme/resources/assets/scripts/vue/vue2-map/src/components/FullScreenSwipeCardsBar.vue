<template>
  <div class='fixed mb-12 z-100050 inset-x-0 bottom-0'>
    <swiper ref="mySwiper" :options="swiperOptions" class="">
      <swiper-slide class="h-16 text-2xl items-center justify-center bg-white border border-black rounded-full inline-flex"><a href="#">Carol</a></swiper-slide>
      <swiper-slide class="h-16 text-2xl items-center justify-center bg-white border border-black rounded-full inline-flex"><a href="#">Tanya</a></swiper-slide>
      <swiper-slide class="h-16 text-2xl items-center justify-center bg-white border border-black rounded-full inline-flex"><a href="#">Kokako</a></swiper-slide>
      <swiper-slide class="h-16 text-2xl items-center justify-center bg-white border border-black rounded-full inline-flex"><a href="#">Something Else</a></swiper-slide>
    </swiper>
  </div>
</template>

<script>
//import SwipeCard from './SwipeCard.vue';
  export default {
    components: {
      //SwipeCard,
    },

    data() {
      return {
        swiperOptions: {
          slidesPerView: 1.5,
          centeredSlides: true,
          spaceBetween: 10,
          // pagination: {
          //   el: '.swiper-pagination',
          // },
          // Some Swiper option/callback...
        },
      }
    },

    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
    },

    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
  }
</script>