<template>
    <div class="review-preview">
        <form @submit.prevent="updateReview">
        <h3>Review:</h3>
        <h3><img class="img-profile-for-review" :src="review.from.imgUrl" alt=""> {{review.from.fullName}}:</h3>
        <textarea v-model="review.txt" cols="30" rows="10"></textarea>
        <h3>Rate:</h3>
        <input type="number" v-model="review.rate">
        <button>Update Review</button>
        </form>
        <button @click.stop="removeReview">Delete Review</button>
    </div>
</template>

<script>
import {eventBus} from '../services/eventbus-service.js';

export default {
    props:['review'],
    data() {
        return {
            reviewForUpdate: null,
        }
    },
    created(){
        this.reviewForUpdate = JSON.parse(JSON.stringify(this.review))
    },
    methods: {
        removeReview(){
             eventBus.$emit('removeReview', this.review._id)
        },
        updateReview(){
             eventBus.$emit('updateReview', this.reviewForUpdate)
        }
    },
}
</script>