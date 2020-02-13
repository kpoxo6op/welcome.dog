console.log('I do NOT want to load JS below on all pages')
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'
import store from '../vue/vue2-map/src/store';
import AppComponent from '../vue/vue2-map/src/components/App.vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCkY9AU1X_KFg6YoBa-OhBvOquFj9HpE9g',
    libraries: 'places',
  },
})

export default {
  init() {
    // JavaScript to be fired on map page
    console.log('this JS loads ONLY on /map url, this is fine')
    new Vue({
      el: '#map-app',
      store,
      components: {
        app: AppComponent,
      },
      render: h => h('app'),
    })
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
