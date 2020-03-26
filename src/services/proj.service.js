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
    remove,
    getHeaderObj
}

function query() {
    // const queryParams = new URLSearchParams();
    // if(filterBy){
    // if(filterBy.name) queryParams.set('name', filterBy.name)
    // queryParams.set('minPrice', filterBy.minPrice);
    // queryParams.set('maxPrice', filterBy.maxPrice);
    // queryParams.set('type', filterBy.type);
    // return httpService.get(`proj?${queryParams}`);
    // } 
    return httpService.get('proj');  
}

function getById(projId) {
    return httpService.get(`proj/${projId}`);
}

function remove(projId) {
    return httpService.delete(`proj/${projId}`);
}

function save(proj) {
    return (proj._id) ? _update(proj) : _add(proj);
}

function _add(proj) {
    return httpService.post(`proj`, proj);
}

function _update(proj) {
    return httpService.put(`proj/${proj._id}`, proj);
}

function getEmptyProj() {
    return {
        title: utilService.makeLorem(12),
        category: '',
        description: utilService.makeLorem(80),
        membersNeeded: 1,
        createdBy: {},
        membersApplyed: [],
        startAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        endsAt: { date: _getValidDate(new Date()), time: _getValidtime(new Date()) },
        imgUrls: [],
        position: { txtAddress: '', lat: 33.886917, lng: 9.537499 },
        requirements: {
            // age: { isOn: false, data: { min: 0, max: 120 } },
            age: [ 0, 120 ],
            day: [ 0, 1000 ],
            // date: { isOn: false, data: { min: 0, max: 365 } },
            languages: [],
            otherSkills: [],
        },
        tags: []
    }
}

function _createProjs() {
    var projs = [

        _createProj('Feeding hungry lions', 'animalsAndWildlife', 1, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-14', time: '12:00' }, { date: '2020-03-14', time: '14:00' }, ['https://saltypopcorn.com.au/wp-content/uploads/2014/07/1q.jpg'], { txtAddress: null, lat: 32.178196, lng: 34.907612 }),
        _createProj('Taking care of dolphins', 'scubaDiving', 2, { _id: 'u102', fullName: 'Puki Ben Pinhas', imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-03-12', time: '14:00' }, { date: '2020-03-12', time: '16:00' }, ['https://sn4.scholastic.com/content/dam/classroom-magazines/sn4/issues/2019-20/090219/dolphins-on-duty/SN4-090219-Dolphins-HR.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach english', 'education', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://cdn2.hubspot.net/hubfs/67369/KJ%20Schultz%20-%20Seoul,%20South%20Korea%20-%20Classroom%20-%20Students-652332-edited.jpg'], { txtAddress: null, lat: 32.083549, lng: 34.815498 }),
        _createProj('Building an orphanage', 'humanitarian', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://s3.amazonaws.com/launchgood/project%2F14381%2Fbody%2FIMG_2067.JPG'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Dancing with crocodails', 'animalsAndWildlife', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://metro.co.uk/wp-content/uploads/2016/11/ad_226722521.jpg?quality=90&strip=all'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Saving huge turtels', 'scubaDiving', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://andyoucreations.com/wp-content/uploads/2017/11/thumbsupturt.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach math', 'education', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.uvolunteer.net/wp-content/uploads/himg-ghana-orphanage.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Taking care of hourses', 'animalsAndWildlife', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.thesprucepets.com/thmb/zMMsYmboywKdTvaYgRb6M-5PfK4=/3437x2578/smart/filters:no_upscale()/woman-brushing-a-horse-532396921-58c94add3df78c353c991e59.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Teach art', 'education', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://rs.projects-abroad.ie/v1/hero/product-5b6d5748b2684.[1600].jpeg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Taking care of hunted gorillaz', 'animalsAndWildlife', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://www.telegraph.co.uk/content/dam/tv/2016/06/15/99637201-Koko-The-Gorilla-CULTURE_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
        _createProj('Women Shelter Activist', 'humanitarian', 3, { _id: 'u103', fullName: 'Shuki Ben Shaul', imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }, { date: '2020-02-27', time: '20:00' }, { date: '2020-02-27', time: '20:30' }, ['https://bloximages.newyork1.vip.townnews.com/winchesterstar.com/content/tncms/assets/v3/editorial/3/c5/3c5f94a0-e97b-5cc9-995c-1115835abfaf/5a8111997e2c0.image.jpg?resize=1200%2C777'], { txtAddress: null, lat: 32.572762, lng: 34.962372 }),
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
        // requirements: {
        //     age: { min: 18, max: 55 },
        //     dayTime: { min: 30, max: 365 },
        //     language: true,
        //     // languageSkills: {is:false, languages: [{language: '', level: ''}]},
        //     criminalBackgroundCheck: false,
        //     education: false,
        //     otherSkills: true,
        // },
        tags: {
            // includes: {
            airportTaxi: true,
            // housing: {
            guestFamily: false,
            singleBad: true,
            dubleBad: false,
            // },
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

function getHeaderObj(filter) {

    var headerObj = {
        'animalsAndWildlife': {
            title: 'Animals And Wildlife',
            desc: 'Wildlife conservation is the perfect volunteer opportunity to protect endangered species from extinction. Volunteer for wildlife conservation projects and help endangered species, like elephants or sloths, that are threatened by habitat loss and human influences. Care for exotic or domestic wildlife and prevent species from going extinct!',
            imgUrl: 'https://i.insider.com/5bebcf4d66be5046a2737572?width=1136&format=jpeg'
        },
        'childcare': {
            title: 'Child Care',
            desc: 'Volunteering with children abroad is a great opportunity to reach out to those who need help the most and discover new countries at the same time. If you love working with children, volunteer at one of the many kindergartens and daycare centers around the world that take care of children from underprivileged families who can\'t afford childcare.',
            imgUrl: 'https://content3.jdmagicbox.com/comp/hyderabad/f5/040pxx40.xx40.190412140024.w6f5/catalogue/people-helping-children-hyderabad-1etcsznxqd.jpg'
        },
        'environmentalProtection': {
            title: 'Environmental Protection',
            desc: 'Environmental volunteering abroad is your chance to protect our nature on land as well as below the water. If you love the great outdoors and hands-on work, then our nature conservancy projects will be the perfect choice for you!',
            imgUrl: 'https://www.ocregister.com/wp-content/uploads/2018/05/hb-cleanup10-0604_.jpg'
        },
        'farming': {
            title: 'Farming',
            desc: 'Support sustainable organic farming and educate locals on how to get the best results of their harvest whilst protecting the environment. Are you a coffee lover? Help small farmers with the work on their coffee plantations and learn where your daily morning coffee comes from.',
            imgUrl: 'https://media.npr.org/assets/img/2017/12/15/farm-59c12ff25ccf74e5b1da779a3ca8a0205491f332.jpg'
        },
        'scubaDiving': {
            title: 'Scuba Diving',
            desc: 'Help to restore coral reefs, carry out surveys of endangered marine life and educate tourists and locals. From diving in Belize to the Philippines or Australia, all these dream destinations are looking for scuba diving volunteers to help them protect our oceans.',
            imgUrl: 'https://www.deeperblue.com/wp-content/uploads/2017/06/AdobeStock_50504380.jpeg'
        },
        'humanitarian': {
            title: 'Humanitarian',
            desc: 'Volunteering for humanitarian initiatives abroad is a fantastic way to immerse yourself in a new culture and really learn from the locals. There is no better way to get to know the ins and outs of a country and its culture than working closely with the people who have grown up and been molded by these exotic and fascinating communities abroad',
            imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/CARE_International_%E2%80%93_friendship_and_love.jpg/1200px-CARE_International_%E2%80%93_friendship_and_love.jpg'
        },
        'healthcare': {
            title: 'Healthcare',
            desc: 'Medical volunteer programs abroad are the perfect opportunities to experience the healthcare industry in a developing country. Assist local doctors and nurses with treating those who need it most. Pre-med, medical college or high school students, there are programs available for every level of medical training or experience.',
            imgUrl: 'https://cdn1.internationalmedicalcorps.org/wp-content/uploads/2017/09/Home-tout-storms.jpg'
        },
        'sports': {
            title: 'Sports',
            desc: 'Sports volunteering abroad is the chance to combine your love for sports with traveling the world. Whether you prefer soccer, basketball, rugby or surfing, volunteering is the perfect way to teach your favorite sports to children and pass on your passion to them.',
            imgUrl: 'https://thinkpacific.com/app/uploads/2017/03/9-compressor-1-e1490783754821.jpg'
        },
        'education': {
            title: 'Education',
            desc: 'Education volunteer opportunities are the perfect way to pass on your knowledge to others while learning about a new country, culture, and people at the same time. Whether you are looking to become a teacher, have teaching experience or are looking to get a TEFL certificate, there is the right volunteer program for you.',
            imgUrl: 'https://www.israel21c.org/wp-content/uploads/2019/09/givingway-KAASO.jpg'
        },
        'art': {
            title: 'Art',
            desc: 'Volunteer for art projects and use all your creativity to do something meaningful whilst you travel the world. Whether you play an instrument, are gifted in arts and crafts or have a passion for photography, there are many projects worldwide focusing on these topics.',
            imgUrl: 'https://images.squarespace-cdn.com/content/v1/54ef4d4ee4b002862ddb9057/1447870457225-WPJRPU1KYVP4B1PXXCPR/ke17ZwdGBToddI8pDm48kFLLrz6BVYXLJG30R1ebmBt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UT7hE3reOkk2moavhrBQHsmGfG-n1OUClfcxCZ1rcWKaJ14ubcdsY0uKwK2_j53OFw/image-asset.jpeg?format=1500w'
        },
        'humanRights': {
            title: 'HumanRights',
            desc: 'Volunteer for women\'s empowerment projects and help to give a voice to those who are otherwise unheard. Gender equality is a big topic in the western world and more important than ever. Sometimes we forget that there are countries where women\'s rights are still pretty much non-existent.',
            imgUrl: 'https://www.unv.org/sites/default/files/UNMISS_HumanRightsOfficer_Francesca_2016_cropped_0.jpg'
        },

    }
    console.log('service', filter);
    return headerObj[filter]


}