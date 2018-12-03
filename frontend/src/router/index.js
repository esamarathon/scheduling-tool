import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Event from '@/components/Event'
import LoginDev from '@/components/LoginDev'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/event/:eventID',
      name: 'Event',
      component: Event
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginDev
    }
  ]
})
