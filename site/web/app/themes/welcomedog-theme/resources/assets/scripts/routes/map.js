import Vue from 'vue'
import AppComponent from '../vue/vue2-map/src/components/App.vue'

export default {
  init() {
    // JavaScript to be fired on map page
    new Vue({
      el: '#map-app',
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
