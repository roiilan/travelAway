import {utilService} from './util.service.js'
import httpService from './http.service.js'


export const toyService = {
    query,
    getById,
    remove,
    getEmpty,
    save,
}

// function query(filterBy) {    
//     // if (filterBy){
//     //     var queryParams  = new URLSearchParams()
//     //     if (filterBy.name) queryParams.set('name_like', filterBy.name)
//     // }
//     return axios.get(`${BASE_URL}?${filterBy}`)
//     // return axios.get(`${BASE_URL}`)
//                 .then(res => res.data)
// }
function query(filterBy) {  
    // console.log(filterBy);
     
    const queryParams = new URLSearchParams();
    
    if(filterBy){
    if(filterBy.name) queryParams.set('name', filterBy.name)
    queryParams.set('minPrice', filterBy.minPrice);
    queryParams.set('maxPrice', filterBy.maxPrice);
    queryParams.set('type', filterBy.type);
    return httpService.get(`toy?${queryParams}`);
    } 
    
    return httpService.get('toy');
    // return httpService.get(`toy/${params}`)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`);
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`);
}

function save(toy) {
   return (toy._id)? _update(toy): _add(toy);
}

function _add(toy) {
    return httpService.post(`toy`, toy);
}
function _update(toy) {
    return httpService.put(`toy/${toy._id}`, toy);
}

function getEmpty() {
    return {
        name: '',
        price: 0,
        type: 'Other',
        inStock: true
    }    
}