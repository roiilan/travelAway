import { reviewService } from '../services/review.service.js';
import { userService } from '../services/user.service.js';

function _getBy() {
    var by = {
        _id: 1,
        fullName: 'Anonymous',
        imgUrl: '../../assets/png/login.png'
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
        by: _getBy(),
        color: ["#a687ec", "#4c207b", "#555076"],
        currReviews:[]
    },
    getters: {
        reviews(state) {
            console.log(state.reviews.length);   
            return state.reviews;
        },
        currReviews(state) {
            console.log(state.reviews.length);   
            
            return state.currReviews;
        },
        by(state) {
            return state.by;
        },
        colors(state) {
            return state.color
        }
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        setCurrReviews(state, {reviews}){
            state.currReviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.unshift(review)
        },
        updateReview(state, { review }) {
            const idx = state.reviews.findIndex(reviewInLoop => reviewInLoop._id === review._id)
            state.reviews.splice(idx, 1, review)
        },
        removeReview(state, { reviewId }) {
            state.reviews = state.reviews.filter(review => review._id !== reviewId)
        },
    },
    actions: {
        async loadReviews(context, { id }) {
            var isId = !!id;
            const reviews = await reviewService.getReviews(id);
            context.commit({ type: isId ?  'setCurrReviews': 'setReviews'  , reviews })            
            return reviews;
        },
        async saveReview(context, { review }) {
            var isEdit = !!review._id;
            review = await reviewService.saveReview(review);
            // console.log('review.about._id in store after:', review.about._id);
            // var user = await userService.getById(review.about._id)
            // console.log('user1:', user);
            // const reviews = await reviewService.getReviews(user._id)
            // user.rate = await reviews.reduce((a,b) => a + b.rate, 0) / (reviews.length)
            // var user = await userService.update(user)
            // console.log(user);
            context.commit({ type: (isEdit) ? 'updateReview' : 'addReview', review })
            return review;
        },
        async removeReview(context, { reviewId }) {
            var msg = await reviewService.remove(reviewId);
            context.commit({ type: 'removeReview', reviewId })
            return msg;
        },
    }
}