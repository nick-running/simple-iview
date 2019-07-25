import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

import SingleLayout from './components/layout/SingleLayout.vue';

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: SingleLayout,
      children: [
        {
          path: 'table',
          meta: {
            title: '表格'
          },
          component: (resolve) => require(['./views/table/Table.vue'], resolve)
        },
        {
          path: 'lineChart',
          meta: {
            title: '表格'
          },
          component: (resolve) => require(['./views/chart/LineChart.vue'], resolve)
        },
        // {
        //   path: 'discoverDetail/:id/:name',
        //   meta: {
        //     title: '发现列表'
        //   },
        //   component: (resolve) => require(['./views/discover/DiscoverDetail.vue'], resolve)
        // },
      ]
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
