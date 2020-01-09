import bus from '../bus'
import Vue from 'vue'
import GithubUserData from '../GithubUserData/index.vue'

export default {
  name: 'GithubOutput',
  components: {
    'github-user-data': GithubUserData,
  },
  data() {
    return {
      currentUsername: null,
      githubData: {},
    }
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
