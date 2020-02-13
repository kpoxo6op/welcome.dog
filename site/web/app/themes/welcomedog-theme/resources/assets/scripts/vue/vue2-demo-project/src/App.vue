<template>
  <div>
    <github-input></github-input>
    <github-output></github-output>
  </div>
</template>

<script>
//register components with the App component
//App will render them
import GithubInput from './components/GitHubInput.vue'
import GithubOutput from './components/GitHubOutput.vue'

export default {
  components: {
    'github-input': GithubInput,
    'github-output': GithubOutput,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
</style>
