<template>
  <div class="fixed mb-12 z-100050 inset-x-0 bottom-0">
    <swiper
      ref="mySwiper"
      @slideChangeTransitionEnd="onSlideChangeTransitionEnd"
      :options="swiperOptions"
      class="h-20 py-2"
    >
      <!-- TODO :class binding pauses slide during transition for 1 sec -->
      <!-- :class="[selectedMapMarkerIndex === index ? 'bg-black text-white' : 'bg-white text-black']" -->
      <swiper-slide
        v-for="card in cards"
        :key="card.id"
        class="items-center justify-center bg-white inline-flex rounded-lg shadow"
      >
        <a href="#">{{ card.title }}</a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  components: {
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 10,
      },
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },

    ...mapState({
      selectedMapMarkerIndex: (state) => state.selectedMarkerIndex,
    }),

    ...mapGetters({
      cards: 'dogPlaceCards',
    }),
  },

  watch: {
    selectedMapMarkerIndex(newIndex) {
      // console.log('slide to index', newIndex)
      this.swiper.slideTo(newIndex, 1000, false);
    },
  },

  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },

  methods: {

    ...mapActions([
      'selectMarker',
    ]),

    onSlideChangeTransitionEnd() {
      // console.log('previous slide Index', this.swiper.previousIndex)
      console.log('active slide Index', this.swiper.activeIndex);
      this.selectMarker({
        index: this.swiper.activeIndex,
      });
    },
  },
};
</script>
