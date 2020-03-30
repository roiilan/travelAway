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
        <h3>{{user.karma}} Karma</h3>
        <h3>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}.</h3>
        <review-avarage :reviews="reviews"/>
        <div v-for="notification in user.notifications" :key="notification">
          <pre>{{notification}}</pre>
        </div>
      </div>
      <proj-map class="map" :zoomSize="zoomSize" :markers="markers" :position="user.position"></proj-map>
    </div>

    <review-list v-if="reviews.length" :reviews="reviews" />

    <div>
      <h3 v-if="!reviews.length">Be the first to give feedback</h3>
      <h3 v-else>Add Review</h3>
      <review-add :review="review" @save="save"/>
    </div>

  </div>
</template>
<script>
import { userService } from "../services/user.service.js";
import projMap from "../components/proj-map.vue";
import reviewList from "../components/review-list.cmp.vue";
import reviewAdd from "../components/review-add.cmp.vue";
import reviewAvarage from "../components/review-avarage.cmp.vue";
import { eventBus } from "../services/eventbus-service.js";


export default {
  data() {
    return {
      user: null,
      review: null,
      markers: [],
      zoomSize: 12,
      colors: ["rgb(42, 55, 56)", "rgb(85, 136, 139)", "rgb(107, 243, 255)"],
      value: null,
    };
  },
  async created() {
    const userId = this.$route.params.id;
    this.user = await userService.getById(userId);
    await this.$store.dispatch({
      type: "loadReviews",
      id: userId
    });
    this.value = this.reviews.reduce((a,b) => a + b.rate, 0) / (this.reviews.length)
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
    eventBus.$on("updateReview",async review=>{
      await this.save(review)
    });
  },
  computed: {
    reviews(){
      return this.$store.getters.reviews;
    }
  },
  // created(){
  //       eventBus.$on('applyToProj', request =>{
  //       console.log(request)    
  //     });

  // },
  components: {
    projMap,
    reviewList,
    reviewAdd,
    reviewAvarage
  }
};
</script>