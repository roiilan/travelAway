<template>
    <div class="user-profile" v-if="user && reviews">
        <h1>{{user.fullName}}<span v-if="user.isAdmin">, (Admin)</span></h1>
        <img :src="user.imgUrl" alt="">
        <h2>{{user.karma}} Karma</h2>
        <h2>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}.</h2>
        <favor-map :position="user.position"> </favor-map>
        <review-list :reviews="reviews"/>
        <form v-if="review" @submit.prevent="save">
            <input type="text" v-model="review.txt">
            <input type="number" v-model="review.rate">
            <pre>{{review}}</pre>
            <button>Add Review</button>
        </form>
    </div>
</template>
<script>
import {userService} from '../services/user.service.js';
import favorMap from '../components/favor-map.vue';
import reviewList from '../components/review-list.cmp.vue';
import {eventBus} from '../services/eventbus-service.js';


export default {
    data() {
        return {
            user: null,
            reviews: null,
            review: null
        }
    },
    async created() {
        const userId = this.$route.params.id;
        this.user = await userService.getById(userId);
        this.reviews = await this.$store.dispatch({type: "loadReviews", userId});
        this.review = {txt: '', rate: 5};
    },
    methods: {
        async save(){
            var reviewAdded = await this.$store.dispatch({ type:'save', review:this.review});
            console.log('reviewAdded: ', reviewAdded)
        }
    },
    mounted() {
        eventBus.$on('removeReview',async reviewId=>{
            const msg = await this.$store.dispatch({ type:'removeReview', reviewId});
            console.log('msg: ', msg);
            this.reviews = this.$store.getters.reviews
      })
    //   eventBus.$on('addReview',async newReview=>{
    //       console.log(newReview);
    //       var review = await this.$store.dispatch({ type:'addReview', newReview});
    //       console.log('review: ', review);
    //   })
    },
    components:{
        favorMap,
        reviewList,
    }
}
</script>