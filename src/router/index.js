import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "components/recommend/recommend"
import Rank from "components/rank/rank"
import Singer from "components/singer/singer"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    }
  ]
})
