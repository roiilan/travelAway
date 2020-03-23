import { utilService } from "./util.service.js";
import { storageService } from "./storage.service.js";

const KEY_REVIEWS = 'reviews'

export const reviewService = {
    getReviews,
    remove,
    save,
}

async function getReviews(userId){
    var reviews = storageService.load(KEY_REVIEWS)
    if (!reviews){
        reviews = _createReviews()
        storageService.store(KEY_REVIEWS, reviews)
    }
    if (userId){
        return reviews.filter(review=>{
            return review.on._id === userId
        })
    } else return reviews;
}

async function remove(reviewId) {
    var reviews = storageService.load(KEY_REVIEWS)
    const idx = reviews.findIndex(review=> review._id === reviewId);
    reviews.splice(idx, 1);
    storageService.store(KEY_REVIEWS, reviews);
    return ('Deletion of the browser successfully completed!!');
    // return httpService.delete(`user/${userId}`)
}

async function save(review) {
    (review._id)? _updateReview(review): _addReview(review);
}

async function _addReview(review) {
    var reviews = storageService.load(KEY_REVIEWS)
    review._id = utilService.makeId()
    reviews.unshift(review)
    storageService.store(KEY_REVIEWS, reviews)
    return reviews
}

function _createReviews(){
    return [
        _createReview(
        'Cool!',
        5, 
        {
            _id: 'u102',
            fullName: 'Puki Ben Pinhas',
            imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        {
            _id: 'u101',
            fullName: 'Muki Ben Moshe',
            imgUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        ),
        _createReview('Cool!',
        5, 
        {
            _id: 'u103',
            fullName: 'Muki Ben Moshe',
            imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        {
            _id: 'u101',
            fullName: 'Muki Ben Moshes',
            imgUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },

        ),
        _createReview('Cool!',
        5, 
        {
            _id: 'u103',
            fullName: 'Muki Ben Moshe',
            imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        {
            _id: 'u102',
            fullName: 'Puki Ben Pinhas',
            imgUrl: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },

        ),
    ]
}

function _createReview(txt, rate, from, on){
    return {
        _id: utilService.makeId(),
        txt,
        rate,
        from,
        on
    }
}

const reviews =[
    {
        _id: utilService.makeId(),
        txt: 'Cool!',
        rate: 1,
        from: {
            _id: 'u101',
            fullName: 'Muki Ben Moshe',
            imgUrl: null 
        },
        on: {
            _id: 'u102',
            fullName: 'Puki Ben Pinhas',
            imgUrl: null
        }
    }
]

