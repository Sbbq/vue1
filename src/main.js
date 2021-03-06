// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import "./assets/css/base.css"
import "./assets/css/checkout.css"
import "./assets/css/login.css"
import "./assets/css/product.css"
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
Vue.prototype.$http=axios;
Vue.use(infiniteScroll);
 
Vue.use(VueLazyload, {
  loading: '/static/Ripple.svg',
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
