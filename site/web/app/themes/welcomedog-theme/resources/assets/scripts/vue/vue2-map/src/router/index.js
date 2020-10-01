import Vue from 'vue';
// import Vuex from 'vuex'
import VueRouter from 'vue-router';
import Search from '../components/Search.vue';
import FrontPage from '../components/FrontPage.vue';

Vue.use(VueRouter);

// TODO: find out why passed props are undefined object
// workaround - access parames from this.$route in my components
const routes = [
  {
    path: '/',
    name: 'Home',
    component: FrontPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: FrontPage,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = new VueRouter({
  // TODO: this removes # from URL but requires web-server tweaks
  // mode: 'history',
  routes,
});

export default router;

/*

browser       -> category=beaches
router        -> category=beaches
map component ->

*/
