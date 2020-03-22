import {utilService} from './util.service.js'
import {storageService} from './storage.service.js'
// import {locService} from './loc.service.js'
// import httpService from './http.service'

const KEY_USERS = 'users';
const KEY_LOGGEDIN = 'loggedinUser';

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    getEmptyUser,
    remove,
    update
}

async function getById(userId) {
    var users = getUsers();
    return users.find(user=> user._id === userId);
    // return httpService.get(`user/${userId}`)
}
function remove(userId) {
    var users = getUsers();
    const idx = users.findIndex(user=> user._id === userId);
    users.splice(idx, 1);
    storageService.store(KEY_USERS, users);
    return ('Deletion of the browser successfully completed!!');
    // return httpService.delete(`user/${userId}`)
}

function update(currUser) {
    var users = getUsers();
    const idx = users.findIndex(user=> user._id === currUser._id);
    users.splice(idx, 1, currUser);
    storageService.store(KEY_USERS, users);
    return currUser;
    // return httpService.put(`user/${user._id}`, user)
}

async function login(credentials) {
    var users = getUsers();
    var user = users.find(user=> user.username.toUpperCase() === credentials.username.toUpperCase() && user.password === credentials.password);
    if (user){
        sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(user))
        return user
    } else return ('User Not Found')
    // const user = await httpService.post('auth/login', userCred)
    // return _handleLogin(user)
}
async function signup(newUserCred) {
    var users = getUsers();
    newUserCred._id = utilService.makeId();
    newUserCred.joinAt = {date:_getValidDate (new Date()),time: _getValidtime(new Date())};
    newUserCred.karma = 5;
    // var pos = await locService.getPosition()
    // newUserCred.loc = {lat: pos.coords.latitude, lng: pos.coords.longitude}
    users.push(newUserCred)
    storageService.store(KEY_USERS, users)
    return newUserCred;
    // const user = await httpService.post('auth/signup', userCred)
    // return _handleLogin(user)
}

// locService.getPosition()
// .then(pos => {
//     mapService.initMap(pos.coords.latitude, pos.coords.longitude)
//         .then(() => {
//             mapService.getNameOfLatLng(pos.coords.latitude, pos.coords.longitude)
//                 .then(locationName => {
//                     mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude }, locationName);
//                     renders(pos.coords.latitude, pos.coords.longitude)
//                 })
//         })
//         .catch(() => console.log('INIT MAP ERROR'));
// })


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

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullName: '',
        imgUrl: 'https://image.flaticon.com/icons/svg/1837/1837526.svg',
        followers: [],
        reviews: [],
        isAdmin: false
    }
}

function _createUsers(){
    var users = [
        _createUser(
         'p101',
         'Muki',
         '111',
         'Muki Ben Moshe',
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
          {date:'2020-01-14', time:'8:32'},
          true
          ),
        _createUser(
            'p102',
            'Puki',
            '222',
            'Puki Ben Pinhas',
            'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            8,
            { lat:22, lng: 21 },
            [
                 {_id:'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
            ],
            [
                {txt: 'Awesome bro!', rate: 5}, {txt: 'Good heart', rate: 5}
            ],
            {date:'2020-02-27', time:'17:47'},
            false
            ),
        _createUser(
         'p103',
         'Shuki',
         '333',
         'Shuki Ben Shaul',
         'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
         44,
        { lat:13, lng: 31 },
        [],
        [],
        {date:'2019-01-30', time:'12:12'},
        false
        )
       ]
    storageService.store(KEY_USERS, users)
    return users;
}

function _createUser(_id, username, password, fullName, imgUrl, karma, loc, followers, reviews, joinAt, isAdmin){
    return {
        _id,
        username,
        password,
        fullName,
        imgUrl,
        karma,
        loc,
        // zoomUrl: '',
        followers,
        reviews,
        // favorsAsked: [],
        // favorsGivven : [],
        joinAt,
        isAdmin
    }
}


// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }

function _getValidDate (date){
    return date.getFullYear() + '-' + _padNum((date.getMonth() + 1)) + '-' + _padNum(date.getDate());
}

function _getValidtime (time){
    return _padNum(time.getHours()) + ':' + _padNum(time.getMinutes());
}

function _padNum(num){
    return (num < 10)? '0' + num: num;
}
