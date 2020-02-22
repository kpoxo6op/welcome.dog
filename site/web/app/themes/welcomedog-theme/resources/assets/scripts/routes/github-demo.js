import Vue from 'vue'
import AppComponent from '../vue/vue2-demo-project/src/App.vue'

export default {
  init() {
    // JavaScript fired on a page with a body class that CONTAINS github-demo
    new Vue({
      el: '#app',
      components: {
        app: AppComponent,
      },
      render: h => h('app'),
    })
  },
  finalize() {
    // JavaScript to be fired on github-demo pages, after page specific JS is fired
  },
};
