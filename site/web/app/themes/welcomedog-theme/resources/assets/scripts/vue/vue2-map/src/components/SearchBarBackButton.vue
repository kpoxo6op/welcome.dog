<template>
  <button
    class="text-gray-600 border-transparent rounded-full focus:outline-none pr-2"
    aria-label="Back"
  >
    <a :href="baseURL">
      <svg
        class="fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z" />
      </svg>
    </a>
  </button>
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
