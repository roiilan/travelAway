import { utilService } from './util.service.js'
import { storageService } from './storage.service.js';
import { userService } from './user.service.js';
import httpService from './http.service.js'

const KEY_FAVORS = 'projs'

export const projService = {
    getEmptyProj,
    query,
    getById,
    save,
    remove
}

function query() {

    // old query

    var projs = storageService.load(KEY_FAVORS)
    if (projs) return projs
    return _createProjs();

    // is filter

    // const queryParams = new URLSearchParams();
    // if(filterBy){
    // if(filterBy.name) queryParams.set('name', filterBy.name)
    // queryParams.set('minPrice', filterBy.minPrice);
    // queryParams.set('maxPrice', filterBy.maxPrice);
    // queryParams.set('type', filterBy.type);
    // return httpService.get(`proj?${queryParams}`);
    // }
    
    
    // return httpService.get('proj');
   
}


function getById(projId) {

    // old getById

    var projs = query()
    return projs.find(proj => proj._id === projId)

    // return httpService.get(`proj/${projId}`);
}

// function remove(projId) {
//     return httpService.delete(`proj/${projId}`);
// }

// function save(proj) {
//    return (proj._id)? _update(proj): _add(proj);
// }

// function _add(proj) {
//     return httpService.post(`proj`, proj);
// }
// function _update(proj) {
//     return httpService.put(`proj/${proj._id}`, proj);
// }


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
        currProj.createdBy = userService.getMinimalUser(loggeinUser)
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
        category: [],
        description: utilService.makeLorem(80),
        membersNeeded: 1,
        isLocal: true,
        createdBy: {},
        takenBy: {},
        startAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        endsAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        imgUrls: [],
        position: { txtAddress: '', lat: 33.886917, lng: 9.537499 },
        requirements: {
            age: {min: 0, max:120},
            dayTime: {min: 0, max:365},
            language: false,
            // languageSkills: {is:false, languages: [{language: '', level: ''}]},
            criminalBackgroundCheck: false,
            education: false,
            otherSkills: false,
        }, 
        tags: {
        // includes: {
            airportTaxi: false,
            housing: {
                guestFamily: false,
                singleBad: false,
                dubleBad: false
            },
            food: false,
            wifi: false,
            hotWater: false,
        }
    }
}

function _createProjs() {
    var projs = [

        _createProj('Feeding hungry lions', ['animalsAndWildlife'], 1, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-14', time: '12:00' }, { date: '2020-03-14', time: '14:00' }, ['https://saltypopcorn.com.au/wp-content/uploads/2014/07/1q.jpg'], { txtAddress: null, lat: 32.178196, lng: 34.907612 }),
        _createProj('Taking care of dolphins', ['scubaDiving'], 2, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-12', time: '14:00' }, { date: '2020-03-12', time: '16:00' }, ['https://sn4.scholastic.com/content/dam/classroom-magazines/sn4/issues/2019-20/090219/dolphins-on-duty/SN4-090219-Dolphins-HR.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach english', ['education'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn2.hubspot.net/hubfs/67369/KJ%20Schultz%20-%20Seoul,%20South%20Korea%20-%20Classroom%20-%20Students-652332-edited.jpg'], { txtAddress: null, lat: 32.083549, lng: 34.815498 }),
        _createProj('Building an orphanage', ['humanitarian'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://s3.amazonaws.com/launchgood/project%2F14381%2Fbody%2FIMG_2067.JPG'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Dancing with crocodails', ['animalsAndWildlife'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://metro.co.uk/wp-content/uploads/2016/11/ad_226722521.jpg?quality=90&strip=all'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Saving huge turtels', ['scubaDiving'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://andyoucreations.com/wp-content/uploads/2017/11/thumbsupturt.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach math', ['education'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.uvolunteer.net/wp-content/uploads/himg-ghana-orphanage.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Taking care of hourses', ['animalsAndWildlife'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.thesprucepets.com/thmb/zMMsYmboywKdTvaYgRb6M-5PfK4=/3437x2578/smart/filters:no_upscale()/woman-brushing-a-horse-532396921-58c94add3df78c353c991e59.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach art', ['education'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://rs.projects-abroad.ie/v1/hero/product-5b6d5748b2684.[1600].jpeg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Taking care of hunted gorillaz', ['animalsAndWildlife'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.telegraph.co.uk/content/dam/tv/2016/06/15/99637201-Koko-The-Gorilla-CULTURE_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Women Shelter Activist', ['humanitarian'], 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://bloximages.newyork1.vip.townnews.com/winchesterstar.com/content/tncms/assets/v3/editorial/3/c5/3c5f94a0-e97b-5cc9-995c-1115835abfaf/5a8111997e2c0.image.jpg?resize=1200%2C777'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
    ]
    storageService.store(KEY_FAVORS, projs)
    return projs;
}

function _createProj(title, category, membersNeeded, createdBy, startAt, endsAt, imgUrls, position) {
    return {
        _id: utilService.makeId(),
        title,
        category,
        description: utilService.makeLorem(250),
        membersNeeded,
        membersApplyed: [],
        createdBy,
        startAt,
        endsAt,
        imgUrls,
        position,
        requirements: {
            age: {min: 18, max:55},
            dayTime: {min: 30, max:365},
            language: true,
            // languageSkills: {is:false, languages: [{language: '', level: ''}]},
            criminalBackgroundCheck: false,
            education: false,
            otherSkills: true,
        }, 
        tags: {
        // includes: {
            airportTaxi: true,
            housing: {
                guestFamily: false,
                singleBad: true,
                dubleBad: false
            },
            food: true,
            wifi: false,
            hotWater: true,
        }

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