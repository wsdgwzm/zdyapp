// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'swiper/swiper-bundle.css'
import untils from '@/untils/untils'
import {InfiniteScroll } from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/my-mint.css'
Vue.use(InfiniteScroll)
Vue.config.devtools = true;
 Vue.prototype.untils= untils
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
