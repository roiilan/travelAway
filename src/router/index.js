import Vue from 'vue'
import VueRouter from 'vue-router'
import favorApp from '../views/favor-app.vue'
import Login from '../views/Login.vue'
import userEdit from '../views/user-edit.vue'
import favorEdit from '../views/favor-edit.vue'
import favorListLocal from '../views/favor-list-local.vue'
import favorDetails from '../components/favor-details.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'favorApp',
        component: favorApp
    },
    {
        path: '/favors',
        name: 'favorsListLocal',
        component: favorListLocal
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/userEdit/:id',
        name: 'userEdit',
        component: userEdit
    },
    {
        path: '/edit/:id?',
        name: 'favorEdit',
        component: favorEdit
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