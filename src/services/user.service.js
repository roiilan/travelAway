import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
import httpService from './http.service.js'

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

    // sessionStorage.clear();
    // var users = getUsers();
    // newUserCred._id = utilService.makeId();
    // newUserCred.joinAt = { date: _getValidDate(new Date()), time: _getValidtime(new Date()) };
    // newUserCred.karma = 5;
    // console.log('newUserCred before: ', newUserCred);

    // console.log('newUserCred after: ', newUserCred);
    // users.push(newUserCred)
    // storageService.store(KEY_USERS, users)
    // sessionStorage.setItem(KEY_LOGGEDIN, JSON.stringify(newUserCred))
    // return newUserCred;
    const user = await httpService.post('auth/signup', newUserCred)
    console.log('userrrr', user)
    return _handleLogin(user)
}



async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
    return ('Exit successfully completed')
}

function getUsers() {
    // var users = storageService.load(KEY_USERS);
    // if (users) return users
    // return _createUsers();
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
        isAdmin: false
    }
}

function _createUsers() {
    var users = [
        _createUser(
            'u101',
            'Muki',
            '111',
            'Muki Ben Moshe',
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            15, { lat: 12, lng: 12 }, { date: '2020-01-14', time: '8:32' },
            true
        ),
        _createUser(
            'u102',
            'Puki',
            '222',
            'Puki Ben Pinhas',
            'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            8, { lat: 22, lng: 21 }, { date: '2020-02-27', time: '17:47' },
            false
        ),
        _createUser(
            'u103',
            'Shuki',
            '333',
            'Shuki Ben Shaul',
            'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            44, { lat: 13, lng: 31 }, { date: '2019-01-30', time: '12:12' },
            false
        )
    ]
    storageService.store(KEY_USERS, users)
    return users;
}

function _createUser(_id, username, password, fullName, imgUrl, karma, position, joinAt, isAdmin) {
    return {
        _id,
        username,
        password,
        fullName,
        imgUrl,
        karma,
        position,
        // pref:[], לעשות בסוף
        // zoomUrl: '', לעשות בסוף
        // favorsAsked: [],
        // favorsGivven : [],
        joinAt,
        isAdmin
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