import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Star from 'components/Star'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/star',
      name: 'star',
      component: Star
    }
  ]
})
