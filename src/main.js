import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import axios from 'axios'
import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
import './my-theme/index.less';
import './styles/main.css';
import './styles/over-iview.css';

import {midServerUrls, insightUrls, matrixUrls} from './urls'
Vue.prototype.$midServerUrls = midServerUrls
Vue.prototype.$insightUrls = insightUrls
Vue.prototype.$matrixUrls = matrixUrls

Vue.use(ViewUI, {
  transfer: true,
  // size: 'large',
  // select: {
  //   arrow: 'md-arrow-dropdown',
  //   arrowSize: 20
  // }
});
Vue.prototype.$Message.config({
  top: 50,
  duration: 3
});
Vue.config.productionTip = false

Vue.prototype.$axios = axios
import sTable from '@/components/table/s-table.vue'
import sLineChart from '@/components/charts/LineChart.vue'
import sGraphChart from '@/components/charts/GraphChart.vue'
import loading from '@/components/loading/loading.vue'
import sCheckbox from '@/components/Checkbox/Checkbox.vue'
import sCheckboxGroup from '@/components/Checkbox/CheckboxGroup.vue'

Vue.component('s-table', sTable)
Vue.component('s-line-chart', sLineChart)
Vue.component('s-graph-chart', sGraphChart)
Vue.component('loading', loading)
Vue.component('s-checkbox', sCheckbox)
Vue.component('s-checkboxGroup', sCheckboxGroup)

import asyncFetchData from '@/mixins/asyncFetchData'
Vue.mixin(asyncFetchData)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
