import httpService from './http.service.js';
import mapService from './map.service.js'

const KEY_LOGGEDIN = 'loggedinUser';

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    getEmptyUser,
    remove,
    update,
    getLoggeinUser,
    getMinimalUser,
}

async function getById(userId) {
    // var users = getUsers();
    // return users.find(user => user._id === userId);
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    // var users = getUsers();
    // const idx = users.findIndex(user => user._id === userId);
    // users.splice(idx, 1);
    // storageService.store(KEY_USERS, users);
    // return ('Deletion of the browser successfully completed!!');
    return httpService.delete(`user/${userId}`)
}

function update(currUser) {
    // var users = getUsers();
    // const idx = users.findIndex(user => user._id === currUser._id);
    // users.splice(idx, 1, currUser);
    // storageService.store(KEY_USERS, users);
    // return currUser;
    return httpService.put(`user/${user._id}`, currUser)
}

async function login(credentials) {
    // var users = getUsers();
    // var user = users.find(user => user.username.toUpperCase() === credentials.username.toUpperCase() && user.password === credentials.password);
    // if (user) {
    //     sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(user))
    //     return user
    // } else return ('User Not Found')
    const user = await httpService.post('auth/login', credentials)
    return _handleLogin(user)
}


async function signup(newUserCred) {
    console.log('signup', newUserCred)
    sessionStorage.clear();
    newUserCred.joinAt = { date: _getValidDate(new Date()), time: _getValidtime(new Date()) };
    newUserCred.karma = 5;
    var pos = await mapService.getPosition()
    newUserCred.position = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(newUserCred))
    const user = await httpService.post('auth/signup', newUserCred)
    console.log('userrrr', user)
    return _handleLogin(user)
}



async function logout() {
    const msg = await httpService.post('auth/logout');
    sessionStorage.clear();
    return (msg)
}

function getUsers() {
    return httpService.get('user')
}

function getLoggeinUser() {
    return JSON.parse(sessionStorage.getItem(KEY_LOGGEDIN))
}

function getMinimalUser(user) {
    return {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl
    }
}

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullName: '',
        imgUrl: 'https://image.flaticon.com/icons/svg/1837/1837526.svg',
        isAdmin: false,
        notifications: [],
    }
}

function _handleLogin(user) {
    sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(user))
    return user;
}

function _getValidDate(date) {
    return date.getFullYear() + '-' + _padNum((date.getMonth() + 1)) + '-' + _padNum(date.getDate());
}

function _getValidtime(time) {
    return _padNum(time.getHours()) + ':' + _padNum(time.getMinutes());
}

function _padNum(num) {
    return (num < 10) ? '0' + num : num;
}