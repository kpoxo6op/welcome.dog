/* eslint-disable no-new */
// console.log('loaded map.js')
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import LoadScript from 'vue-plugin-load-script';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import vSelect from 'vue-select';
import 'swiper/css/swiper.css';
import store from '../vue/vue2-map/src/store';
import router from '../vue/vue2-map/src/router';
import AppComponent from '../vue/vue2-map/src/components/App.vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCkY9AU1X_KFg6YoBa-OhBvOquFj9HpE9g',
    libraries: 'places',
  },
});
Vue.use(LoadScript);
Vue.use(VueAwesomeSwiper);
Vue.component('v-select', vSelect);

export default {
  init() {
    // JavaScript to be fired on map page
    // console.log('this JS loads ONLY on /map url, this is fine')
    new Vue({
      el: '#map-app',
      store,
      router,
      LoadScript,
      components: {
        app: AppComponent,
      },
      render: (h) => h('app'),
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
