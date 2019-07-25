import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/main.css';
import './styles/over-iview.css';

import {midServerUrls, insightUrls, matrixUrls} from './urls'
Vue.prototype.$midServerUrls = midServerUrls
Vue.prototype.$insightUrls = insightUrls
Vue.prototype.$matrixUrls = matrixUrls

Vue.use(iView);
Vue.config.productionTip = false

Vue.prototype.$axios = axios
import sTable from '@/components/table/s-table.vue'
import loading from '@/components/loading/loading.vue'

Vue.component('s-table', sTable)
Vue.component('loading', loading)

import asyncFetchData from '@/mixins/asyncFetchData'
Vue.mixin(asyncFetchData)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
