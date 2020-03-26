<template>
    <div class="review-list">
        <h2 v-if="!reviews.length">Be the first to give feedback</h2>
        <review-preview
        v-for="review in reviews" :key="review._id"
        :review="review"
        />
    </div>
</template>

<script>
import reviewPreview from './review-preview.cmp.vue'

export default {
    name: 'review-list',
    props: ['reviews'],
    components: {
        reviewPreview,
    }
}
</script>

// @removeReview="$emit('removeReview', reviewId)"
//         @addReview="$emit('addReview', newReview)"