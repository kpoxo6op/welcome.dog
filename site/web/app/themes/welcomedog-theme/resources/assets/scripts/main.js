// import external dependencies
import 'jquery';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';
import githubDemo from './routes/github-demo';
import map from './routes/map';
//Vue
//import Vue from 'vue';
//import store from './vue/vue2-map/src/store';
//import * as VueGoogleMaps from 'vue2-google-maps'
//import AppComponent from './vue/vue2-map/src/components/App.vue'

// Vue.use(VueGoogleMaps, {
//   load: {
//     //how do I hide it?
//     key: 'AIzaSyCkY9AU1X_KFg6YoBa-OhBvOquFj9HpE9g',
//     libraries: 'places',
//   },
// })
/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
  // github demo
  githubDemo,
  // full page map
  map,
});

// new Vue({
//   el: '#map-app',
//   store,
//   components: {
//     app: AppComponent,
//   },
//   render: h => h('app'),
// })

// Load Events
jQuery(document).ready(() => routes.loadEvents());
