import Vue from 'vue'
import VueRouter from 'vue-router'
import favorApp from '../views/favor-app.vue'
import Login from '../views/Login.vue'
import userProfile from '../views/user-profile.vue'
import userEdit from '../views/user-edit.vue'
import favorEdit from '../views/favor-edit.vue'
import favorList from '../components/favor-list.vue'
import favorDetails from '../components/favor-details.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'favorApp',
        component: favorApp
    },
    {
        path: '/favors',
        name: 'favors',
        component: favorApp
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/user/:id',
        name: 'userProfile',
        component: userProfile
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