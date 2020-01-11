import Vue from 'vue'
import AppComponent from '../vue/vue2-demo-project/src/App.vue'

export default {
  init() {
    // JavaScript to be fired on all pages
    new Vue({
      el: '#app',
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
