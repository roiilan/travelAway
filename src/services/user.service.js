const user = {
    _id: 'u100',
    fullName: 'Muki',
    karma: 5,
    followers: [{}],
    reviews: [{txt: 'cool!', rate: 5}, {txt: 'didnt show up', rate: 1}],
    zoomUrl: '',
    loc: {lat, lng}
  }

// import {utilService} from './util.service.js'
// import {storageService} from './storage.service.js'

// const KEY_FAVORS = 'favors'

export const favorService = {
    // getEmptyFavor,
    // query,
    // getById,
    // save,
    // remove
}

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

// function _createFavors(){
//     var favors = [
//         // _createFavor('Dog walking', 'Puki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 5)), 'https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'),
//         // _createFavor('Take my kids away', 'Muki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 3)), 'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'),
//         // _createFavor('Picture on the side', 'Shuki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 30 * 2)), 'https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg')
//         _createFavor('Dog walking', 'Puki', {date:'2020-03-14', time:'12:00'},{date:'2020-03-14', time:'14:00'}, 'https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'),
//         _createFavor('Take my kids away', 'Muki', {date:'2020-03-12', time:'14:00'},{date:'2020-03-12', time:'16:00'}, 'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'),
//         _createFavor('Picture on the side', 'Shuki', {date:'2020-02-27', time:'20:00'},{date:'2020-02-27', time:'20:30'}, 'https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg')
//     ]
//     storageService.store(KEY_FAVORS, favors)
//     return favors;
// }

// function _createFavor(title, requestedBy, startAt,endsAt, imgUrl){
//     return {
//         _id: utilService.makeId(),
//         title,
//         description: utilService.makeLorem(80),
//         requestedBy,
//         takenBy : {},
//         startAt,
//         endsAt,
//         imgUrl
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

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

// function getById(userId) {
//     return httpService.get(`user/${userId}`)
// }
// function remove(userId) {
//     return httpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return httpService.put(`user/${user._id}`, user)
// }

// async function login(userCred) {
//     const user = await httpService.post('auth/login', userCred)
//     return _handleLogin(user)
// }
// async function signup(userCred) {
//     const user = await httpService.post('auth/signup', userCred)
//     return _handleLogin(user)
// }
// async function logout() {
//     await httpService.post('auth/logout');
//     sessionStorage.clear();
// }
// function getUsers() {
//     return httpService.get('user')
// }

// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }