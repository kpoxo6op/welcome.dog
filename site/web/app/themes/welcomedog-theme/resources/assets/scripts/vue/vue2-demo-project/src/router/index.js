import Vue from 'vue'
// import Vuex from 'vuex'
import VueRouter from 'vue-router'
import GitHubOutput from '../components/GitHubOutput.vue'
Vue.use(VueRouter)

//TODO: decide how my links should look like
//http://welcomedog.test/map/#/beaches
//http://welcomedog.test/map/#/?category=beaches
const routes = [
  {
    path: '/',
    name: 'Home',
    component: GitHubOutput,
    beforeEnter: (to, from, next) => {
      console.log('entered route: ', to.name)
      next()
    },
  },
  {
    path: '/user/:githubUsername',
    name: 'GitHubOutput',
    component: GitHubOutput,
    props: true,
    beforeEnter: (to, from, next) => {
      console.log('entered route: ', to.name)
      next()
    },
  },
]

const router = new VueRouter({
  //TODO: this removes # from URL but requires web-server tweaks
  //mode: 'history',
  routes,
})

export default router