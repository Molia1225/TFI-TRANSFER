import Vue from 'vue'
import Router from 'vue-router'

/* let routeList = [];
(route=>{
  route.keys().forEach(key => {
    routeList=routeList.concat(route(key).default)
  });
})(require.context('./routeModule',true,/\.js/)); */

Vue.use(Router)
let basePath = process.env.NODE_ENV=='development'?'/':'/fundTransfer/'
export default new Router({
  mode: 'history',
  base:basePath,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/baseLayout'),
      redirect: '/home',
      meta: { index: 0 },
      children: [{
        path: '/home',
        name: 'openHome',
        component: () => import('../views/home'),
        meta: { index: 0, title: '资金划转' },
      },{
        path: '/transfer-flow',
        name: 'transferFlow',
        component: () => import('../views/home/transferFlow'),
        meta: { index: 0, title: '划转流水' },
      },{
        path: '/transfer-guide',
        name: 'guide',
        component: () => import('../views/home/guide'),
        meta: { index: 0, title: '美股交易指南' },
      },]
    },
  ]
})
