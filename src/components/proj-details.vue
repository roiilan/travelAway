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
        </router-link>
      </div>
      <div class="main-content-details-contianer">
        <div class="title-proj">{{proj.title}}</div>
        <div class="img-proj-container ratio-16-9">
          <img class="img-proj" :src="proj.imgUrls[0]" alt="proj picture" />
        </div>
        <div class="main-content-details">
          <article class="description">
            <span class="strong">Description:</span>
            {{proj.description}}
          </article>

          <div class="requirements">
            <h3>Requirements:</h3>
            <p>
              <span class="strong">Required Dates:</span>
              {{proj.date[0]}} - {{proj.date[1]}}
            </p>
            <p>
              <span class="strong">Members needed:</span>
              {{proj.membersApplyed.length}} / {{proj.membersNeeded}}
            </p>
            <p v-if="proj.requirements.languages.length">
              <span class="strong">Language control: </span>
              <span v-for="language in proj.requirements.languages" :key="language">{{language}}</span>
            </p>
            <p v-if="proj.requirements.otherSkills.length">
              <span class="strong">Other Skills:</span>
              <span v-for="skill in proj.requirements.otherSkills" :key="skill">{{skill}}</span>
            </p>
            <p>
              <span class="strong">Minimum Age:</span>
              {{proj.requirements.minAge}}
            </p>
          </div>

          <div class="tags" v-if="proj.tags.length">
            <h3>What is included?</h3>
            <p v-for="tag in proj.tags" :key="tag">{{tag}}</p>
          </div>

          <review-avarage :reviews="reviews" />
        </div>
      </div>
        <review-list v-if="reviews.length" class="reviews-container" :reviews="reviews" />

        <div class="reviews-container">
          <h3 v-if="!reviews.length">Be the first to give feedback</h3>
          <h3 v-else>Add Review</h3>
          <review-add :review="review" :proj="proj" @save="save" />
        </div>
        <div class="card-deatails map-container">
          <proj-map :zoomSize="zoomSize" :markers="markers" :position="position"></proj-map>
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
      colors: this.$store.getters.colors,
      markers: [],
      position: {
        txtAdress: null,
        lat: 33.886917,
        lng: 9.537499
      }
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
    this.getMarkers();
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
    reviews() {
      return this.$store.getters.reviews;
    }
  },
  methods: {
    openApply() {
      this.isApplyOpen = false;
    },
    stop() {},
    async save(review) {
      review.by = (this.loggedinUser)? this.loggedinUser: {
        _id: 1,
        fullName: 'Anonymous',
        imgUrl: '../assets/icon/login.png'
    }
      var reviews = await this.$store.dispatch({
        type: "saveReview",
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
    },
    getMarkers() {
      var markers = [{ pos: this.proj.position, proj: this.proj }];
      markers.forEach(marker => {
        this.markers.push({
          position: { lat: marker.pos.lat, lng: marker.pos.lng },
          proj: marker.proj
        });
      });
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
