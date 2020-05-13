<template>
<div>
  <div class="flex flex-col items-center" v-for="(value,name) in dogPlaceCards" :key="name.id" >
    <DogPlaceCard
      v-bind:card="value"
    ></DogPlaceCard>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import DogPlaceCard from './DogPlaceCard.vue'
export default {
  components: {
    DogPlaceCard,
  },
  
  computed: {
    ...mapGetters([
      'dogPlaceCards',
    ]),
  },
}
</script>