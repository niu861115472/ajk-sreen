import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
import Home from '@/components/home'
import Index from '@/view/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/index',
      name: 'Index',
      component:Index
    }
  ]
})
