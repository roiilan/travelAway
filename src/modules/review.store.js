import {reviewService} from '../services/review.service.js';
import {userService} from '../services/user.service.js';

function _getBy() {
    var by = {
        _id: 1, 
        fullName: 'Anonymous', 
        imgUrl: '../assets/icon/login.png'
    }
    
    const user = JSON.parse(sessionStorage.getItem('loggedinUser'))
    // const user = userService.getLoggeinUser()
    
    if (user) {
        by = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        }
    }
    return by
}

export default {
    state: {
        reviews: [],
        by :_getBy(),
    },
    getters: {
        reviews(state) {
            return state.reviews;
        },
        by(state){
            return state.by;
        },
    },
    mutations: {
        setReviews(state, {reviews}) {
            state.reviews = reviews;
        },
        
        removeReview(state, {reviewId}) {
            state.reviews = state.reviews.filter(review => review._id !== reviewId)
        },
    },
    actions: {
        async loadReviews(context, {id}) {
            const reviews = await reviewService.getReviews(id);
            context.commit({type: 'setReviews', reviews})
            return reviews;
        },
        async save(context, {review}) {
            var reviews = await reviewService.save(review);
            context.commit({type: 'setReviews', reviews})
            return reviews;
        },
        async removeReview(context, {reviewId}) {
            var msg = await reviewService.remove(reviewId);
            context.commit({type: 'removeReview', reviewId})
            return msg;
        },
        // async updateReview(context, {review}) {
        //     review = await reviewService.update(review);
        //     // context.commit({type: 'setReview', review})
        //     return review;
        // },
    }
}