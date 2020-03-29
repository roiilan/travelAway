<template>
    <div class="review-list">
        <div v-for="(review, index) in reviews" :key="review._id">

        <review-preview
         v-if="index < 4"
        :review="review"
        />
        <h4 class="read-more" v-if="index >= 4">Read more</h4> 
        </div>
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