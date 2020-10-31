<template>
  <div class="flex justify-center content-center text-gray-600 text-sm mt-2">
    <a :href="baseURL">PHP page</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
        baseURL: sageData.ajaxBaseURL, // eslint-disable-line
    };
  },
};
</script>
