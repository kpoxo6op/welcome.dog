<template>
  <div class="flex flex-col items-center">
    <DogPlaceCard></DogPlaceCard>
    <DogPlaceCard></DogPlaceCard>
    <DogPlaceCard></DogPlaceCard>
    <DogPlaceCard></DogPlaceCard>
    <DogPlaceCard></DogPlaceCard>
  </div>
</template>

<script>
import DogPlaceCard from './DogPlaceCard.vue'
export default {
  components: {
    DogPlaceCard,
  },
  
}
</script>