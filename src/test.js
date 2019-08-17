import Vue from 'vue'
import App from './App'
import router from './router'
import  store from './store'
import axios from './fetch/axios';
import './components/index'

import './utils/mobileAdaptive'

import './style/index.less'


// import VConsole from 'vconsole'
// new VConsole();

Vue.config.productionTip = false;





/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
