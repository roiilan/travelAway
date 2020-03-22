import {reviewService} from '../services/review.service.js'

export default {
    state: {
        reviews: []
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
        // removeReview(state, {reviewId}) {
        //     state.reviews = state.reviews.filter(review => review._id !== reviewId)
        // },
    },
    actions: {
        async loadReviews(context, {userId}) {
            const reviews = await reviewService.getReviews(userId);
            context.commit({type: 'setReviews', reviews})
            return reviews;
        },
        // async addReview(context, {review}) {
        //     return await reviewService.addReview(review);
        //     // context.commit({type: 'removeReview', reviewId})
        //     // return msg;
        // },
        // async removeReview(context, {reviewId}) {
        //     var msg = await reviewService.remove(reviewId);
        //     // context.commit({type: 'removeReview', reviewId})
        //     return msg;
        // },
        // async updateReview(context, {review}) {
        //     review = await reviewService.update(review);
        //     // context.commit({type: 'setReview', review})
        //     return review;
        // },
    }
}