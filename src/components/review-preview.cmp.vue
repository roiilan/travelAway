<template>
    <div class="review-preview">
        <h3>Review:</h3>
        <h3><img class="img-profile-for-review" :src="review.from.imgUrl" alt=""> {{review.from.fullName}}: {{review.txt}}</h3>
        <h3>Rate: {{review.rate}}</h3>
        <button @click.stop="removeReview">Delete Review</button>
    </div>
</template>

<script>
import {eventBus} from '../services/eventbus-service.js';

export default {
    props:['review'],
    methods: {
        removeReview(){
             eventBus.$emit('removeReview', this.review._id)
        }
    },
}
</script>