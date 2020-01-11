<template>
  <div v-if="data">
    <h4>{{ data.name }}</h4>
    <p>{{ data.company }}</p>
    <p>blog: {{ data.blog }}</p>
    <p>{{ data.following }}</p>
    <p>Number of repos: {{ data.public_repos }}</p>
  </div>
</template>
<script>
//src\GithubUserData\script.js
export default {
  props: ['data'],
  data() {
    return {}
  },
}
</script>
<style scoped></style>
