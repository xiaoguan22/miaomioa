import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from './movie'
import MineRouter from './mine'
import CinemaRouter from './cinema'
import adminRouter from './admin'

Vue.use(VueRouter)

  

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes:[
    MovieRouter,
    MineRouter,
    CinemaRouter,
    adminRouter,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})

