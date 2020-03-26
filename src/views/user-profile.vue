<template>
  <div class="user-profile width-container" v-if="user && reviews">
    <div class="main-content">
      <div>
        <div class="main-img-profile-contianer ratio-square">
          <img class="main-img-profile" :src="user.imgUrl" />
          <h1 class="username">
            {{user.fullName}}
            <span v-if="user.isAdmin">, (Admin)</span>
          </h1>
        </div>
        <h2>{{user.karma}} Karma</h2>
        <h2>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}.</h2>
        <el-rate
          v-model="averageRate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points"
        ></el-rate>
        <h2 v-if="reviews.length === 1">One review</h2>
        <h2 v-else-if="reviews.length > 1">{{reviews.length}} Reviews</h2>
      </div>
      <proj-map class="map" :zoomSize="zoomSize" :markers="markers" :position="user.position"></proj-map>
    </div>

    <review-list :reviews="reviews" />
    <form class="add-review flex col" v-if="review" @submit.prevent="save(review)">
      <h2>Add Review</h2>
      <textarea type="text" v-model="review.txt" placeholder="Comment..."></textarea>
      <el-rate
        v-model="review.rate"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text
      >:colors="colors"></el-rate>
      <button>Add Review</button>
    </form>
  </div>
</template>
<script>
import { userService } from "../services/user.service.js";
import projMap from "../components/proj-map.vue";
import reviewList from "../components/review-list.cmp.vue";
import { eventBus } from "../services/eventbus-service.js";

export default {
  data() {
    return {
      user: null,
      reviews: [],
      review: null,
      markers: [],
      zoomSize: 12,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      averageRate: null,
    };
  },
  async created() {
    const userId = this.$route.params.id;
    this.user = await userService.getById(userId);
    this.reviews = await this.$store.dispatch({
      type: "loadReviews",
      id: userId
    });
    this.averageRate = this.reviews.reduce((a,b) => a + b.rate, 0)
    this.review = this.getEmptyReview();
    this.markers.push({
      position: { lat: this.user.position.lat, lng: this.user.position.lng }
    });
  },
  methods: {
    async save(review) {
      var reviews = await this.$store.dispatch({
        type: "save",
        review
      });
      this.reviews = this.$store.getters.reviews;
      this.review = this.getEmptyReview();
    },
    getEmptyReview() {
      return {
        txt: "",
        rate: null,
        by: this.$store.getters.by,
        about: {
          _id: this.user._id,
          fullName: this.user.fullName,
          imgUrl: this.user.imgUrl
        }
      };
    }
  },
  mounted() {
    eventBus.$on("removeReview", async reviewId => {
      const msg = await this.$store.dispatch({
        type: "removeReview",
        reviewId
      });
      console.log("msg: ", msg);
      this.reviews = this.$store.getters.reviews;
    });
    eventBus.$on("updateReview", async review => {
      console.log(review);
      this.save(review);
      //   var review = await this.$store.dispatch({ type:'addReview', newReview});
      //   console.log('review: ', review);
    });
  },
  components: {
    projMap,
    reviewList
  }
};
</script>