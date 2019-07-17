import Vue from 'vue'
import Router from 'vue-router'
import Repos from './views/Repositories.vue'
import Commits from './views/Commits.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'repos',
      component: Repos
    },
    {
      path: '/:repo/commits',
      name: 'commits',
      component: Commits,
      props: true
    }
  ]
})
