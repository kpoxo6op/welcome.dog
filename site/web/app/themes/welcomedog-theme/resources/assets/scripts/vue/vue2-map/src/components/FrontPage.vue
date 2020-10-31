<template>
  <div>
    <FrontPagePHPLink />
    <AutoCompleteSelect class="flex justify-center content-center mx-6 my-10" />
    <FrontPageHero />
    <div class="mt-8 card-slider sm:mx-6">
      <FrontPagePromoCard />
      <FrontPagePromoCard />
      <FrontPagePromoCard />
    </div>
    <FrontPageDestinations />
    <FrontPageSubmitNewPlace />
    <FrontPageFooter />
  </div>
</template>

<script>
import AutoCompleteSelect from './AutoCompleteSelect.vue';
import FrontPageHero from './FrontPageHero.vue';
import FrontPagePromoCard from './FrontPagePromoCard.vue';
import FrontPageDestinations from './FrontPageDestinations.vue';
import FrontPageSubmitNewPlace from './FrontPageSubmitNewPlace.vue';
import FrontPageFooter from './FrontPageFooter.vue';
import FrontPagePHPLink from './FrontPagePHPLink.vue';

export default {
  components: {
    AutoCompleteSelect,
    FrontPageHero,
    FrontPagePromoCard,
    FrontPageDestinations,
    FrontPageSubmitNewPlace,
    FrontPageFooter,
    FrontPagePHPLink,
  },

  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {

  },

};
</script>
