// const user = {
//     _id: 'u100',
//     fullName: 'Muki',
//     imgUrl: null,
//     karma: 5,
//     loc: {lat, lng},
//     zoomUrl: '',
//     followers: [{}],
//     reviews: [{txt: 'cool!', rate: 5}, {txt: 'didnt show up', rate: 1}],
//     favorsAsked: [],
//     favorsGivven : [],
// }

import {utilService} from './util.service.js'
import {storageService} from './storage.service.js'

const KEY_USERS = 'users';
const KEY_LOGGEDIN = 'loggedinUser';

export default {
    login,
    logout,
    // signup,
    getUsers,
    getById,
    // remove,
    // update
}

function getById(userId) {
    var users = getUsers();
    return users.find(user=> user._id === userId);
    // return httpService.get(`user/${userId}`)
}
// function remove(userId) {
//     return httpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return httpService.put(`user/${user._id}`, user)
// }

async function login(credentials) {
    var users = getUsers();
    var user = users.find(user=> user.fullName.toUpperCase() === credentials.fullName.toUpperCase() && user.password === credentials.password);
    if (user){
        sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(user))
        return user
    } else return ('User Not Found')
    // const user = await httpService.post('auth/login', userCred)
    // return _handleLogin(user)
}
// async function signup(userCred) {
//     const user = await httpService.post('auth/signup', userCred)
//     return _handleLogin(user)
// }
async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
    return ('Exit successfully completed')
}
function getUsers() {
    var users =  storageService.load(KEY_USERS);
    if (users) return users 
    return _createUsers();
    // return httpService.get('user')
}

// function login(credentials){
//     return axios.post(USER_API, credentials)
//             .then(res=> res.data)
//             .then(user => {
//                 if (user){
//                     sessionStorage.setItem(KEY, JSON.stringify(user))
//                     return Promise.resolve(user)
//                 } else return Promise.reject('User Not Found')
//             })
// }

function getLoggeinUser() {
    return JSON.parse(sessionStorage.getItem(KEY_LOGGEDIN))    
}


function _createUsers(){
    var users = [
        _createUser(
         'p101',
         'Muki Ben Moshe',
         '111',
         'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          15,
          { lat:12, lng: 12 },
          [
              {_id:'p102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
              {_id:'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
          ],
          [
              {txt: 'Cool!', rate: 5},
              {txt: 'Didnt show up', rate: 1}
          ],
          {date:'2020-01-14', time:'8:32'}
          ),
        _createUser(
            'p102',
            'Puki Ben Pinhas',
            '222',
            'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            8,
            { lat:22, lng: 21 },
            [
                 {_id:'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
            ],
            [
                {txt: 'Awesome bro!', rate: 5}, {txt: 'Good heart', rate: 5}
            ],
            {date:'2020-02-27', time:'17:47'}
            ),
        _createUser('p103',
         'Shuki Ben Shaul',
         '333',
         'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
         44,
        { lat:13, lng: 31 },
        [],
        [],
        {date:'2019-01-30', time:'12:12'}
        )
       ]
    storageService.store(KEY_USERS, users)
    return users;
}

function _createUser(_id, fullName, password,  imgUrl, karma, loc, followers, reviews, joinAt){
    return {
        _id,
        fullName,
        password,
        imgUrl,
        karma,
        loc,
        // zoomUrl: '',
        followers,
        reviews,
        // favorsAsked: [],
        // favorsGivven : [],
        joinAt,
    }
}


// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }

// export const favorService = {
    // getEmptyFavor,
    // query,
    // getById,
    // save,
    // remove
// }

// function query(){
//     var favors =  storageService.load(KEY_FAVORS)
//     if (favors) return favors 
//     return _createFavors();
// }

// function getById (favorId) {
//     var favors = query()
//     return favors.find(favor=> favor._id === favorId)
// }

// function save (favor) {
//     var favors = query()
//     favors = (favor._id)? _updateFavor(favor, favors): _addFavor(favor, favors);
//     storageService.store(KEY_FAVORS, favors)
//     return favors
// }

// function _updateFavor (currFavor, favors) {
//     const idx = favors.findIndex(favor=> favor._id === currFavor._id)
//     favors.splice(idx, 1, currFavor)
//     return favors
// }

// function _addFavor(currFavor, favors) {
//     currFavor._id = utilService.makeId();
//     favors.unshift(currFavor);
//     return favors
// }

// function remove(favorId){
//     var favors = query()
//     const idx = favors.findIndex(favor=> favor._id === favorId)
//     favors.splice(idx, 1)
//     storageService.store(KEY_FAVORS, favors)
//     return ('The deletion was successful!!')
// }

// function getEmptyFavor() {
//     return {
//         title: '',
//         description: '',
//         requestedBy: '',
//         takenBy : {},
//         startAt: {date:_getValidDate (new Date()),time: _getValidtime(new Date())},
//         endsAt: {date:_getValidDate (new Date()),time: _getValidtime(new Date())},
//         imgUrl: 'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'
//     }
// }



function _getValidDate (date){
    return date.getFullYear() + '-' + _padNum((date.getMonth() + 1)) + '-' + _padNum(date.getDate());
}

function _getValidtime (time){
    return _padNum((time.getHours() + 1)) + ':' + _padNum(time.getMinutes());
}

function _padNum(num){
    return (num < 10)? '0' + num: num;
}

// import httpService from './http.service'

