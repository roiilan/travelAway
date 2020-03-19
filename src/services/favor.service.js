import {utilService} from './util.service.js'
import {storageService} from './storage.service.js'

const KEY_FAVORS = 'favors';

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
    return favors.find(favor=> favor._id = favorId)
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
        _id: 'p1011',
        title: 'Dog walking / Take my kids away / Picture on the side',
        description: '',
        requestedBy: {},
        takenBy : {},
        startAt: 2872222,
        endsAt: null,
    }
}

function _createFavors(){
    return [
        _createFavor('Dog walking', 'Puki', Date.now - (1000 * 60 * 60 * 24 * 5)),
        _createFavor('Take my kids away', 'Muki', Date.now - (1000 * 60 * 60 * 24 * 3)),
        _createFavor('Picture on the side', 'Shuki', Date.now - (1000 * 60 * 60 * 24 * 30 * 2))
    ]

}

var idNum =100
function _createFavor(title, requestedBy, startAt){
    return {
        // _id: utilService.makeId(),
        _id: idNum++,
        title,
        description: utilService.makeLorem(80),
        requestedBy,
        takenBy : {},
        startAt,
        endsAt: null,
    }
}