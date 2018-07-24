import Vue from 'vue'
import Router from 'vue-router'
import TicketCreate from '@/components/TicketCreate'
import TicketDashboard from '@/components/TicketDashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TicketCreate',
      component: TicketCreate
    },
    {
      path: '/tickets',
      name: 'TicketDashboard',
      component: TicketDashboard
    }
  ]
})
