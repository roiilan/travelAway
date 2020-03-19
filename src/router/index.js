import Vue from 'vue'
import VueRouter from 'vue-router'
// import favorList from '../components/favor-list.vue'
import favorApp from '../views/favor-app.vue'
import favorDetails from '../components/favor-details.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'favorApp',
        component: favorApp
    },


    // {
    //   path: '/favor/:id?',
    //   name: 'favorDetails',
    //   component: favorDetails
    // },


]

const router = new VueRouter({
    routes
})

export default router