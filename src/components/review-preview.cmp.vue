<template>
    <div class="review-preview">
                <h3>Review:</h3>
                <h3><img class="img-profile-for-review" :src="review.createBy.imgUrl" alt=""> {{review.createBy.fullName}}: {{review.txt}}</h3>
                <h3>Rate: {{review.rate}}</h3>
                <!-- <button @click="$emit('removeReview', review._id)">Delete Review</button> -->
                <button @click.stop="removeReview">Delete Review</button>
                <form v-if="newReview" @submit.prevent="addReview">
                <!-- <form v-if="newReview" @submit.prevent="$emit('addReview', newReview)"> -->
                    <input type="text" v-model="newReview.txt">
                    <input type="number" v-model="newReview.rate">
                    <button>Add Review</button>
                </form>
    </div>
</template>

<script>
import {eventBus} from '../services/eventbus-service.js';

export default {
    props:['review'],
    data() {
        return {
            newReview: null,
        }
    },
    created() {
        this.newReview = {txt: '', rate: 5}
    },
    methods: {
        removeReview(){
             eventBus.$emit('removeReview', this.review._id)
        },
        addReview(){
             eventBus.$emit('addReview', this.newReview)
        }
    },
}
</script>