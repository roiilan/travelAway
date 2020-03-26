import router from '@/router'
import store from '@/store'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    // : '//localhost:3000/api/'
    : '//localhost:3030/api/'


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
        console.log('endpoint:', endpoint);
        console.log('method:', method);
        console.log('data:', data);
        
        const res = await axios({
            method,
            url: `${BASE_URL}${endpoint}`,
            data
        })
        console.log('res.data:', res.data);
        return res.data;
    } catch (err) {
        if (err.response.status === 401) {
            throw new Error('error:  http.service page')
            router.push('/');
        }
    }
}

