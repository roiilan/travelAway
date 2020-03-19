import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'
import favorDetails from '../views/Home.vue'
import favorList from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/favor',
    name: 'favorList',
    component: favorList
  },
  
  {
    path: '/favor/:id?',
    name: 'favorDetails',
    component: favorDetails
  },
  

]

const router = new VueRouter({
  routes
})

export default router
