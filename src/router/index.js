import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index/index'
import qz from '../pages/qz/qz'
import tx from '../pages/tx/tx'
import live from '../pages/live/live'
import userCenter from '../pages/usercenter/usercenter'
import login from '../pages/login/login'
import classIntro from '../pages/classIntro/classIntro'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {
          path: '/',
          redirect: '/index'
      },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/qz',
      name: 'qz',
      component: qz,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/tx',
      name: 'tx',
      component: tx,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/live',
      name: 'live',
      component: live,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta:{
        showFooter:false
      }
    },
      {
        path:'/classIntro',
        name:'classIntro',
        component:classIntro
      }

  ]
})
