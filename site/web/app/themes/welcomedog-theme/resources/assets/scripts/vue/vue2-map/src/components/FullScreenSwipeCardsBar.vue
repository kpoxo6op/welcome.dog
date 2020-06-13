<template>
  <div class='fixed mb-12 z-100050 inset-x-0 bottom-0'>
    <swiper ref='mySwiper' @slideChange='onSlideChange' :options='swiperOptions' class='h-16'>
      <!-- TOODO: :class visibly slows down transition-->
        <swiper-slide
          v-for="(card, index) in cards"
          :key="card.id"
          :class="[index === selectedMapMarkerIndex ? 'border-2': 'border']"
          class='items-center justify-center bg-white border-black rounded-full inline-flex'>
          <a href='#'>{{ card.title }}</a>
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex';
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
      }
    },

    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },

      ...mapState({
        selectedMapMarkerIndex: state => state.selectedMarkerIndex,
      }),

      ...mapGetters({
        cards: 'dogPlaceCards',
      }),
    },

    watch: {
      selectedMapMarkerIndex(newIndex) {
        //console.log('slide to index', newIndex)
        this.swiper.slideTo(newIndex, 1000, false)
      },
    },

    mounted() {
      //console.log('Current Swiper instance object', this.swiper)
      //this.swiper.slideTo(3, 1000, false)
    },

    methods: {

      ...mapActions([
        'selectMarker',
      ]),

      onSlideChange() {
        //console.log('previous slide Index', this.swiper.previousIndex)
        console.log('active slide Index', this.swiper.activeIndex)
        this.selectMarker({
          index: this.swiper.activeIndex,
        })
      },
    },
  }
</script>