import Vue from 'vue'
import VueRouter from 'vue-router'
import projApp from '../views/walkways-app.vue'
import Login from '../views/Login.vue';
import userProfile from '../views/user-profile.vue'
import userEdit from '../views/user-edit.vue'
import projEdit from '../views/proj-edit.vue'
import projListFiltered from '../views/proj-list-filtered.vue'
import projDetails from '../components/proj-details.vue'
import projList from '../components/proj-list.vue'
import projSearch from '../components/proj-search.vue'
import projListSearch from '../components/proj-list-search.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'projApp',
        component: projApp
    },
    {
        path: '/projs/aroundTheWorld',
        name: 'aroundTheWorld',
        component: projList
    },
    {
        path: '/search',
        name: 'projSearch',
        component: projSearch
    },
    {
        path: '/projs/q/:filter',
        name: 'projListSearch',
        component: projListSearch
    },
 
    {
        path: '/projs/:filter',
        name: 'projsListFiltered',
        component: projListFiltered
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
        name: 'projEdit',
        component: projEdit
    },
    {
        path: '/proj/:id?',
        name: 'projDetails',
        component: projDetails
    },
    
]

const router = new VueRouter({
    routes
})

export default router