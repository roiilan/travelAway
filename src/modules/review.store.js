import {reviewService} from '../services/review.service.js';

var localLoggedinUser = null;

function _getFrom() {
    var form = {
        _id: 1, 
        fullName: 'Anonymous', 
        imgUrl: '../assets/icon/login.png'
    }
    // const user = userService.getLoggedinUser()

}

// if (sessionStorage.loggedinUser) {
//     localLoggedinUser = JSON.parse(sessionStorage.loggedinUser);
//     form = {
//         _id: localLoggedinUser._id, 
//         fullName: localLoggedinUser.fullName, 
//         imgUrl: localLoggedinUser.imgUrl
//     }
// } 



export default {
    state: {
        reviews: [],
        from :_getFrom(),
    },
    getters: {
        reviews(state) {
            return state.reviews;
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
        async loadReviews(context, {userId}) {
            const reviews = await reviewService.getReviews(userId);
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