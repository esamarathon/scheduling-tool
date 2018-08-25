// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
import 'moment'

import './assets/theme.scss'

import App from './App'
import router from './router'

import ScheduleElement from './components/ScheduleElement'
import ScheduleListElement from './components/ScheduleListElement'
import Schedule from './components/Schedule'
import ScheduleList from './components/ScheduleList'
import People from './components/People'
import ColumnsView from './components/ColumnsView'
import ListView from './components/ListView'
import DevView from './components/DevView'
import store from './datamodel'

Vue.use(VueMaterial)

Vue.component('scheduleelement', ScheduleElement)
Vue.component('schedulelistelement', ScheduleListElement)
Vue.component('schedule', Schedule)
Vue.component('schedulelist', ScheduleList)
Vue.component('people', People)
Vue.component('columnsview', ColumnsView)
Vue.component('devview', DevView)
Vue.component('listview', ListView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
