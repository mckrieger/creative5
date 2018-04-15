import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SearchResults from '@/components/SearchResults'
import UserPage from '@/components/UserPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/search',
      name: 'SearchResults',
      component: SearchResults
    },
    {
      path: '/user/:userID',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
  ]
})
