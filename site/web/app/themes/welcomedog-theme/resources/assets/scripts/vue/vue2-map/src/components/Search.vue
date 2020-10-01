<template>
  <div>
    <AutoCompleteSearchBar />
    <GMap />
    <MainContent />
  </div>
</template>

<script>
import AutoCompleteSearchBar from './AutoCompleteSearchBar.vue';
import GMap from './GMap.vue';
import MainContent from './MainContent.vue';

export default {
  components: {
    GMap,
    AutoCompleteSearchBar,
    MainContent,
  },
};
</script>
