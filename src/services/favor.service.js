import {utilService} from './util.service.js'
import {storageService} from './storage.service.js'

const KEY_FAVORS = 'favors'

export const favorService = {
    getEmptyFavor,
    query,
    getById,
    save,
    remove
}

function query(){
    var favors =  storageService.load(KEY_FAVORS)
    if (favors) return favors 
    return _createFavors();
}

function getById (favorId) {
    var favors = query()
    return favors.find(favor=> favor._id === favorId)
}

function save (favor) {
    var favors = query()
    favors = (favor._id)? _updateFavor(favor, favors): _addFavor(favor, favors);
    storageService.store(KEY_FAVORS, favors)
}

function _updateFavor (currFavor, favors) {
    const idx = favors.findIndex(favor=> favor._id = currFavor._id)
    favors.splice(idx, 1, currFavor)
    return favors
}

function _addFavor(currFavor, favors) {
    currFavor._id = utilService.makeId();
    favors.unshift(currFavor);
    return favors
}

function remove(favorId){
    var favors = query()
    const idx = favors.findIndex(favor=> favor._id = favorId)
    favors.splice(idx, 1)
    storageService.store(KEY_FAVORS, favors)
}

function getEmptyFavor() {
    return {
        title: '',
        description: '',
        requestedBy: '',
        takenBy : {},
        startAt: _getValidDate (new Date()),
        endsAt: null,
    }
}

function _createFavors(){
    var favors = [
        // _createFavor('Dog walking', 'Puki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 5)), 'https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'),
        // _createFavor('Take my kids away', 'Muki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 3)), 'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'),
        // _createFavor('Picture on the side', 'Shuki', _getValidDate(Date.now() - (1000 * 60 * 60 * 24 * 30 * 2)), 'https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg')
        _createFavor('Dog walking', 'Puki', '2020-03-14', 'https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'),
        _createFavor('Take my kids away', 'Muki', '2020-03-12', 'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'),
        _createFavor('Picture on the side', 'Shuki', '2020-02-27', 'https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg')
    ]
    storageService.store(KEY_FAVORS, favors)
    return favors;
}

function _createFavor(title, requestedBy, startAt, imgUrl){
    return {
        _id: utilService.makeId(),
        title,
        description: utilService.makeLorem(80),
        requestedBy,
        takenBy : {},
        startAt,
        endsAt: null,
        imgUrl
    }
}

function _getValidDate (time){
    return time.getFullYear() + '-' + _padNum((time.getMonth() + 1)) + '-' + _padNum(time.getDate());
}

function _padNum(num){
    return (num < 10)? '0' + num: num;
}