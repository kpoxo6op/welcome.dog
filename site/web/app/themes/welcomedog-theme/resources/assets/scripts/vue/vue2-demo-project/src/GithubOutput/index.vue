<!-- src/GithubOutput/index.vue -->
<template>
  <div>
    <p v-if="currentUsername == null">Enter a username above to see their Github data</p>
    <p v-else>
      Below are the results for {{ currentUsername }}
      <!--The crucial part here is how I pass the data property down to the component:
      The colon at the start of that attribute is crucial;
      it tells Vue that the attribute we’re passing down is dynamic
      and that the component should be updated every time the data changes.
      Vue will evaluate the value of githubData[currentUsername]
      and ensure that the GithubUserData component is kept up to date as the data changes.
      -->
      <github-user-data :data="githubData[currentUsername]"></github-user-data>
    </p>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>

<!-- before refactoring
<p v-if="currentUsername == null">
  Enter a username above to see their GitHub data
</p>
<p v-else>
  Below are the results for {{ currentUsername }}
  <div v-if="githubData[currentUsername]">
    <h4>{{ githubData[currentUsername].name }}</h4>
    <p>{{ githubData[currentUsername].company }}</p>
    <p>Number of repos: {{ githubData[currentUsername].public_repos }}</p>
  </div>
</p>
 -->
