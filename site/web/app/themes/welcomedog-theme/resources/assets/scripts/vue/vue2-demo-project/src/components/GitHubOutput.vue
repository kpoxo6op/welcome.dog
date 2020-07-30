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
<script>
import bus from '../bus'
import Vue from 'vue'
import GithubUserData from './GithubUserData.vue'

export default {
  components: {
    'github-user-data': GithubUserData,
  },
  data() {
    return {
      currentUsername: null,
      githubData: {},
    }
  },

  props: {
    githubUsername: {
      type: String,
      required: true,
    },
  },

  //We then define the onUsernameChange method
  //which will be called and will set the currentUsername property
  //"name" can be anything i.e. "msg" or "input"
  methods: {
    onUsernameChange(name) {
      this.currentUsername = name
      this.fetchGithubData(name)
    },
    fetchGithubData(name) {
      // if we have data already, don't request again
      if (this.githubData.hasOwnProperty(name)) return

      const url = `https://api.github.com/users/${name}`
      //https://www.sitepoint.com/introduction-to-the-fetch-api/
      //fetch() returns Response object when promise is fulfiled.
      //Response object exposes "json" method
      fetch(url)
        //When the promise is fulfilled, it returns a Response object, which exposes a json method
        //call this json method to return the response body as JSON
        .then(r => r.json())
        //However, the json method also returns a promise,
        //which means we need to chain on another then()
        .then(data => {
          //This code will modify this.githubData, adding the key and value that we pass it.
          //It also notifies Vue of the change so it can rerender.
          Vue.set(this.githubData, name, data)
        })
    },
  },
  //When the component is created, we want to listen for any new-username events
  //that are emitted on the message bus.Thankfully, Vue supports a number of lifecycle hooks,
  //including created.
  created() {
    bus.$on('new-username', this.onUsernameChange)
  },
  //Because we’re responsible developers,
  //let’s also stop listening for events when the component is destroyed by using the destroyed event:
  destroyed() {
    bus.$off('new-username', this.onUsernameChange)
  },

}
</script>
<style scoped></style>

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
