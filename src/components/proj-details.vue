<template>
  <div class="proj-details-container width-container" v-if="proj">
    <div class="proj-details">
      <!-- <router-link :to="'/user/' + proj.createdBy._id">
          <img class="img-user" 
          :src="proj.createdBy.imgUrl" 
          :alt="proj.createdBy.fullName"
          :title="proj.createdBy.fullName"/>
      </router-link>-->
      <div class="edit-link-container width-container">
        <router-link
          v-if="loggedinUser &&
        (loggedinUser._id === proj.createdBy._id || 
        loggedinUser.isAdmin)"
          :to="'/edit/' + proj._id"
          class="edit-link flex col a-center"
          title="Edit Project"
        >
          <img class="btn-img" src="../assets/icon/edit.png" alt />
          <!-- Edit -->
        </router-link>
      </div>
      <div class="main-content-details">
        <div class="title-proj">{{proj.title}}</div>
        <div class="img-proj-container ratio-16-9">
          <img class="img-proj" :src="proj.imgUrls[0]" alt="proj picture" />
          <!-- <h2 >how can you Help?</h2> -->
        </div>
        <article class="description">
          <span class="strong">Description:</span>
          {{proj.description}}
        </article>
        <span class="strong">Required Dates:</span>
        <span v-if="proj.date">{{proj.date[0]}} - {{proj.date[1]}}</span>
        <span v-else>{{proj.startAt.date}} - {{proj.endsAt.date}}</span>
        <review-avarage :reviews="reviews" />
      </div>

      <div class="util-details">
        <div class="card-deatails"></div>

        <div></div>

        <div class="card-deatails map-container">
          <proj-map
            class="map"
            :zoomSize="zoomSize"
            :markers="[{ position: { lat: proj.position.lat, lng: proj.position.lng } }]"
            :position="proj.position"
          ></proj-map>
        </div>

        <review-list class="reviews-container" :reviews="reviews" />

        <div class="reviews-container">
          <h2 v-if="!reviews.length">Be the first to give feedback</h2>
          <h3 v-else>Add Review</h3>
          <review-add :review="review" @save="save" />
        </div>
      </div>
    </div>
    <div @click.stop="stop">
      <proj-apply
        :proj="proj"
        :user="loggedinUser"
        class="proj-apply"
        :class="{'apply-opened':isApplyOpen}"
      ></proj-apply>
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
import reviewAdd from "../components/review-add.cmp.vue";
import reviewAvarage from "../components/review-avarage.cmp.vue";
import { eventBus } from "../services/eventbus-service.js";

export default {
  data() {
    return {
      proj: null,
      isApplyOpen: false,
      isEdit: false,
      zoomSize: 14,
      review: null,
      averageRate: null,
      colors: ["rgb(42, 55, 56)", "rgb(85, 136, 139)", "rgb(107, 243, 255)"]
    };
  },
  async created() {
    const projId = this.$route.params.id;
    this.proj = await this.$store.dispatch({
      type: "loadProj",
      projId
    });
    await this.$store.dispatch({
      type: "loadReviews",
      id: projId
    });
    this.averageRate = this.reviews.reduce((a, b) => a + b.rate, 0);
    this.review = this.getEmptyReview();
  },
  components: {
    projMap,
    projApply,
    reviewList,
    reviewAdd,
    reviewAvarage
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    reviews(){
      return this.$store.getters.reviews;
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
    eventBus.$on("updateReview", async review => {
      await this.save(review);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.openApply);
  }
};
</script>

<style>
</style>
