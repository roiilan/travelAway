import { reviewService } from '../services/review.service.js';
import { userService } from '../services/user.service.js';

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
        by: _getBy(),
    },
    getters: {
        reviews(state) {
            return state.reviews;
        },
        by(state) {
            return state.by;
        },
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.unshift(review)
        },
        updateReview(state, { review }) {
            console.log('review in miutition in store:', review);

            const idx = state.reviews.findIndex(reviewInLoop => reviewInLoop._id === review._id)
            state.reviews.splice(idx, 1, review)
        },
        removeReview(state, { reviewId }) {
            state.reviews = state.reviews.filter(review => review._id !== reviewId)
        },
    },
    actions: {
        async loadReviews(context, { id }) {
            // console.log(id);

            const reviews = await reviewService.getReviews(id);
            context.commit({ type: 'setReviews', reviews })

            return reviews;
        },
        async save(context, { review }) {
            var isEdit = !!review._id;

            review = await reviewService.save(review);
            console.log('review in store after:', review);
            context.commit({ type: (isEdit) ? 'updateReview' : 'addReview', review })
            return review;
        },
        async removeReview(context, { reviewId }) {
            var msg = await reviewService.remove(reviewId);
            context.commit({ type: 'removeReview', reviewId })
            return msg;
        },
        // async updateReview(context, {review}) {
        //     review = await reviewService.update(review);
        //     // context.commit({type: 'setReview', review})
        //     return review;
        // },
    }
}