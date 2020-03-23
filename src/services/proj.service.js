import { utilService } from './util.service.js'
import { storageService } from './storage.service.js';
import { userService } from './user.service';


const KEY_FAVORS = 'projs'

export const projService = {
    getEmptyProj,
    query,
    getById,
    save,
    remove
}

function query() {
    var projs = storageService.load(KEY_FAVORS)
    if (projs) return projs
    return _createProjs();
}

function getById(projId) {
    var projs = query()
    return projs.find(proj => proj._id === projId)
}

function save(proj) {
    var projs = query()
    projs = (proj._id) ? _updateProj(proj, projs) : _addProj(proj, projs);
    storageService.store(KEY_FAVORS, projs)
    return projs
}

function _updateProj(currProj, projs) {
    const idx = projs.findIndex(proj => proj._id === currProj._id)
    projs.splice(idx, 1, currProj)
    return projs
}

function _addProj(currProj, projs) {
    const loggeinUser = userService.getLoggeinUser()
    console.log('loggeinUser in service: ', loggeinUser);
    if (loggeinUser) {
        currProj.requestedBy = userService.getMinimalUser(loggeinUser)
    }
    currProj._id = utilService.makeId();
    projs.unshift(currProj);
    return projs
}

function remove(projId) {
    var projs = query()
    const idx = projs.findIndex(proj => proj._id === projId)
    projs.splice(idx, 1)
    storageService.store(KEY_FAVORS, projs)
    return ('The deletion was successful!!')
}

function getEmptyProj() {
    return {
        title: utilService.makeLorem(12),
        description: utilService.makeLorem(80),
        membersNeeded: 1,
        isLocal: true,
        requestedBy: {},
        takenBy: {},
        startAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        endsAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        imgUrls: [],
        position: { txtAddress: '', lat: null, lng: null }
    }
}

function _createProjs() {
    var projs = [

        _createProj('Dog walking', 1, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-14', time: '12:00' }, { date: '2020-03-14', time: '14:00' }, ['https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'], { txtAddress: null, lat: 32.178196, lng: 34.907612 }),
        _createProj('Take my kids away', 2, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-12', time: '14:00' }, { date: '2020-03-12', time: '16:00' }, ['https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Picture on the side', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { txtAddress: null, lat: 32.083549, lng: 34.815498 }),
        _createProj('Picture on the side', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Picture on the side', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Picture on the side', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 })
    ]
    storageService.store(KEY_FAVORS, projs)
    return projs;
}

function _createProj(title, membersNeeded, requestedBy, startAt, endsAt, imgUrls, position) {
    return {
        _id: utilService.makeId(),
        title,
        description: utilService.makeLorem(80),
        membersNeeded,
        requestedBy,
        takenBy: {},
        startAt,
        endsAt,
        imgUrls,
        position,

    }
}

function _getValidDate(date) {
    return date.getFullYear() + '-' + _padNum((date.getMonth() + 1)) + '-' + _padNum(date.getDate());
}

function _getValidtime(time) {
    return _padNum((time.getHours() + 1)) + ':' + _padNum(time.getMinutes());
}

function _padNum(num) {
    return (num < 10) ? '0' + num : num;
}