import { utilService } from './util.service.js'
import { storageService } from './storage.service.js';
import { userService } from './user.service';


const KEY_FAVORS = 'favors'

export const favorService = {
    getEmptyFavor,
    query,
    getById,
    save,
    remove
}

function query() {
    var favors = storageService.load(KEY_FAVORS)
    if (favors) return favors
    return _createFavors();
}

function getById(favorId) {
    var favors = query()
    return favors.find(favor => favor._id === favorId)
}

function save(favor) {
    var favors = query()
    favors = (favor._id) ? _updateFavor(favor, favors) : _addFavor(favor, favors);
    storageService.store(KEY_FAVORS, favors)
    return favors
}

function _updateFavor(currFavor, favors) {
    const idx = favors.findIndex(favor => favor._id === currFavor._id)
    favors.splice(idx, 1, currFavor)
    return favors
}

function _addFavor(currFavor, favors) {
    const loggeinUser = userService.getLoggeinUser()
    console.log('loggeinUser in service: ', loggeinUser);
    if (loggeinUser) {
        currFavor.requestedBy = userService.getMinimalUser(loggeinUser)
    }
    currFavor._id = utilService.makeId();
    favors.unshift(currFavor);
    return favors
}

function remove(favorId) {
    var favors = query()
    const idx = favors.findIndex(favor => favor._id === favorId)
    favors.splice(idx, 1)
    storageService.store(KEY_FAVORS, favors)
    return ('The deletion was successful!!')
}

function getEmptyFavor() {
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
        address: '',
        position: ''
    }
}

function _createFavors() {
    var favors = [
        _createFavor('Dog walking', 1, { _id: 'p102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-14', time: '12:00' }, { date: '2020-03-14', time: '14:00' }, ['https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'], { lat: 32.178196, lng: 34.907612 }),
        _createFavor('Take my kids away', 2, { _id: 'p102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-12', time: '14:00' }, { date: '2020-03-12', time: '16:00' }, ['https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'], { lat: 32.572762, lng: 34.962372 }),
        _createFavor('Picture on the side', 3, { _id: 'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { lat: 32.083549, lng: 34.815498 }),
        _createFavor('Picture on the side', 3, { _id: 'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { lat: 32.083549, lng: 34.815498 }),
        _createFavor('Picture on the side', 3, { _id: 'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { lat: 32.083549, lng: 34.815498 }),
        _createFavor('Picture on the side', 3, { _id: 'p103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'], { lat: 32.083549, lng: 34.815498 })
    ]
    storageService.store(KEY_FAVORS, favors)
    return favors;
}

function _createFavor(title, membersNeeded, requestedBy, startAt, endsAt, imgUrls, position) {
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
        address: '',
        position
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