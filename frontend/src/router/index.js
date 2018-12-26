import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Event from '@/components/Event'
import LoginDev from '@/components/LoginDev'
import ColumnsView from '@/components/ColumnsView'
import ListView from '@/components/ListView'
import DevView from '@/components/DevView'
import ConstraintsView from '@/components/ConstraintsView'
import ScheduleList from '@/components/ScheduleList'

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
      component: Event,
      children: [
        {
          path: 'columns',
          name: 'ColumnsView',
          component: ColumnsView
        },
        {
          path: 'list',
          name: 'ListView',
          component: ListView,
          children: [
            {
              path: 'schedule/:scheduleID',
              name: 'ScheduleList',
              component: ScheduleList
            }
          ]
        },
        {
          path: 'constraints',
          name: 'ConstraintsView',
          component: ConstraintsView
        },
        {
          path: 'dev',
          name: 'DevView',
          component: DevView
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginDev
    }
  ]
})
