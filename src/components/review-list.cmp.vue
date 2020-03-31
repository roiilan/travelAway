<template>
    <div class="review-list">
        <div v-for="(review, index) in reviews" :key="review._id">

        <review-preview
         v-if="index < limit"
        :review="review"
        />
        <h4 class="show-more" @click="limit = 100" v-if="index === limit">Show more</h4> 
        </div>
        <h4 class="show-more" @click="limit = 4" v-if="limit !== 4">Show less</h4> 
    </div>
</template>

<script>
import reviewPreview from './review-preview.cmp.vue'

export default {
    name: 'review-list',
    props: ['reviews'],
    components: {
        reviewPreview,
    },
    data() {
        return {
            limit: 4,
        }
    },
}
</script>

// @removeReview="$emit('removeReview', reviewId)"
//         @addReview="$emit('addReview', newReview)"