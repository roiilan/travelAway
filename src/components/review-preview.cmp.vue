<template>
    <div class="review-preview">
        <!-- <form @submit.prevent="updateReview"> -->
        <h3><img class="img-profile" :src="reviewForUpdate.by.imgUrl" alt=""> {{reviewForUpdate.by.fullName}}:</h3>
        <p>{{reviewForUpdate.txt}}</p>
         <el-rate
          v-model="reviewForUpdate.rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points"
        ></el-rate>
        <!-- <button>Update Review</button> -->
        <!-- </form> -->
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