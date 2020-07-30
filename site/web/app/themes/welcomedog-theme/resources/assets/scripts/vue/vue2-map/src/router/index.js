import Vue from 'vue'
// import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Controls from '../components/Controls.vue'
Vue.use(VueRouter)

//TODO: find out why passed props are undefined object
//workaround - access parames from this.$route in my components
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Controls,
    beforeEnter: (to, from, next) => {
      console.log('entered route: ', to.name, ', query string:', to.query)
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

/*

browser       -> category=beaches
router        -> category=beaches
map component ->

*/