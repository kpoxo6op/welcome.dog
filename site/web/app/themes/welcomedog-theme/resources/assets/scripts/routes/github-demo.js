import Vue from 'vue'
import AppComponent from '../vue/vue2-demo-project/src/App.vue'
import router from '../vue/vue2-demo-project/src/router'

export default {
  init() {
    // JavaScript fired on a page with a body class that CONTAINS github-demo
    new Vue({
      el: '#app',
      router,
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
