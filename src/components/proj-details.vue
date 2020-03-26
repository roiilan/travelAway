<template>
  <div class="proj-details-container width-container" v-if="proj">
    <div class="proj-details">
      <!-- <router-link :to="'/user/' + proj.createdBy._id">
          <img class="img-user" 
          :src="proj.createdBy.imgUrl" 
          :alt="proj.createdBy.fullName"
          :title="proj.createdBy.fullName"/>
      </router-link>-->
      <router-link
        v-if="loggedinUser && (loggedinUser._id === proj.createdBy._id || loggedinUser.isAdmin)"
        :to="'/edit/' + proj._id"
      >EDIT</router-link>
      <div class="img-proj-container ratio-16-9">
        <img class="img-proj" :src="proj.imgUrls[0]" alt="proj picture" />
        <!-- <h2 >how can you Help?</h2> -->
        <input v-if="isEdit" class="title-proj" v-model="proj.title" />
        <div v-else class="title-proj">{{proj.title}}</div>
      </div>

      <div class="main-content-details">
        <article class="card-deatails description">
          <span class="strong">Description:</span>
          {{proj.description}}
        </article>
        <div class="card-deatails">
          <span class="strong">Required Dates:</span>
          {{proj.startAt.date}} - {{proj.endsAt.date}}
        </div>

        <div>
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

        <div class="card-deatails map-container">
          <proj-map
            class="map"
            :zoomSize="zoomSize"
            :markers="[{ position: { lat: proj.position.lat, lng: proj.position.lng } }]"
            :position="proj.position"
          ></proj-map>
        </div>

        <!-- <div> -->
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
        <!-- </div> -->
      </div>
    </div>
    <div @click.stop="stop">
      <proj-apply class="proj-apply" :class="{'apply-opened':isApplyOpen}"></proj-apply>
    </div>
    <div
      @click.stop="isApplyOpen = true"
      class="proj-apply-for-mobile"
      :class="{'apply-opened':isApplyOpen}"
    >Apply now</div>
  </div>
</template>

<script>
import projMap from "./proj-map.vue";
import projApply from "./proj-apply.cmp.vue";
import reviewList from "../components/review-list.cmp.vue";

export default {
  data() {
    return {
      proj: null,
      isApplyOpen: false,
      isEdit: false,
      zoomSize: 14,
      reviews: [],
      review: null,
      averageRate: null,
    };
  },
  async created() {
    const projId = this.$route.params.id;
    this.proj = await this.$store.dispatch({
      type: "loadProj",
      projId
    });
    this.reviews = await this.$store.dispatch({
      type: "loadReviews",
      id: projId
    });
    this.averageRate = this.reviews.reduce((a,b) => a + b.rate, 0)
    this.review = this.getEmptyReview();
  },
  components: {
    projMap,
    projApply,
    reviewList
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    openApply() {
      this.isApplyOpen = false;
    },
    stop() {},
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
        rate: 5,
        by: this.$store.getters.by,
        about: {
          _id: this.proj._id,
          fullName: this.proj.title,
          imgUrl: this.proj.imgUrls[0]
        }
      };
    }
  },
  mounted() {
    document.addEventListener("click", this.openApply);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.openApply);
  }
};
</script>

<style>
</style>
