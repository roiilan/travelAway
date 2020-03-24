// import router from '@/router'
import router from '../router/index.js'
// import VueRouter from 'vue-router'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3000/api/'


import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data){
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null) {
    try {
        var config = {
            url: `${BASE_URL}${endpoint}`,
            method
        }
        if (method === 'get' || method === 'GET') config.params = {data}
        else config.data = data
        
        const res = await axios(config)
        return res.data;
    } catch (err) {
        if (err.response.status === 401) {
            router.push('/');
            throw new Error('Unautonticated-  http.service page')
        }
    }
}

