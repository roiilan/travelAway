<template>
    <li class="user-list">
        <button @click="$emit('removeUser', user._id)">Delete User</button>
        <router-link :to="'/userEdit/' + user._id">Updete User</router-link>
        <h2>{{user.fullName}}</h2>
        <img :src="user.imgUrl" :alt="user.fullName">
        <h3>Karma: {{user.karma}}</h3>
        <h3>Join At- date: {{user.joinAt.date}} time: {{user.joinAt.time}}</h3>
        <review-list 
        :reviews="user.reviews" 
        />
    </li>
</template>

<script>
import {eventBus} from '../services/eventbus-service.js';

import reviewList from './review-list.cmp.vue'
export default {
    name: 'user-list',
    props: ['user'],
    components: {
        reviewList,
    },
     async mounted() {
      eventBus.$on('removeReview', reviewId=>{
          console.log(reviewId);
          
            this.$emit('removeReview', {reviewId, userId:this.user._id})
      })
      eventBus.$on('addReview', newReview=>{
          console.log(newReview);
          
            this.$emit('removeReview', {newReview, user:this.user})
      })
  },
}
</script>

<style>
img {
    width: 150px;
    /* height: 350px; */
    /* border-radius: 50%; */

}

.img-profile-for-review{
    width: 30px;
}
</style>

//  @removeReview="$emit('removeReview', {reviewId, userId:user._id})"
//         @addReview="$emit('addReview', {newReview, user})"