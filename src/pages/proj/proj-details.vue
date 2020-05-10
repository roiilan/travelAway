<template>
  <div class="proj-details-container width-container" v-if="proj">
    <popap-chat :proj="proj"/>

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
          <img class="btn-img" src="../../assets/png/edit.png" alt />
        </router-link>
      </div>

      <div class="main-content-details-contianer">
        <h1 class="title-proj">{{proj.title}}</h1>
        <h5>{{proj.createdBy.fullName}}</h5>
        <div class="img-proj-container ratio-16-9">
          <img class="img-proj" :src="proj.imgUrls[0]" alt="proj picture" />
        </div>
        <div class="main-content-details">
          <!-- <section v-for="item in items" :key="item" class="accodion-item"> -->
          <section>
            <div @click="setActive('description')" class="flex a-center bet">
              <h3 class="flex bet">
                Description
                <img :class="{'arrow-down': active === 'description'}" src="../../assets/svg/downloading2.svg" alt />
              </h3>
            </div>
            <transition name="fade">
              <p v-if="active === 'description'">{{proj.description}}</p>
            </transition>
          </section>
          <section>
            <div @click="setActive('requirements')" class="flex a-center bet">
               <h3 class="flex bet">
                Requirements
                <img :class="{'arrow-down': active === 'requirements'}" src="../../assets/svg/downloading2.svg" alt />
              </h3>
            </div>
            <transition name="fade">
              <div v-if="active === 'requirements'">
                <p>
                  <span class="strong">Required Dates:</span>
                  {{proj.date[0]}} - {{proj.date[1]}}
                </p>
                <p>
                  <span class="strong">Members needed:</span>
                  {{proj.membersNeeded}} / {{proj.membersNeeded + proj.membersApplyed.length}}
                </p>
                <p v-if="proj.requirements.languages.length">
                  <span class="strong">Language control:</span>
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
            </transition>
          </section>
          <section>
            <div @click="setActive('tags')" class="flex a-center bet">
                <h3 class="flex bet">
                What is included
                <img :class="{'arrow-down': active === 'tags'}" src="../../assets/svg/downloading2.svg" alt />
              </h3>
            </div>
            <transition name="fade">
              <ul v-if="active === 'tags'">
                <p v-for="tag in proj.tags" :key="tag">{{tag}}</p>
              </ul>
            </transition>
          </section>
          <review-avarage class="review-avarage" :reviews="reviews" />
        </div>
      </div>
      <review-list v-if="reviews.length" class="reviews-container" :reviews="reviews" />
        <review-add v-if="loggedinUser && loggedinUser._id !== proj.createdBy._id" :review="review" @save="save" />
      <div class="card-deatails map-container">
        <map-preview :array="[proj]"></map-preview>
      </div>
    </div>
    <div v-if="loggedinUser && loggedinUser._id !== proj.createdBy._id" @click.stop="stop">
      <proj-apply
        @onApply="onApply"
        :proj="proj"
        :user="loggedinUser"
        class="proj-apply"
        :class="{'apply-opened':isApplyOpen, 'apply-on':isApplyOn}"
      ></proj-apply>
    </div>
    <div
    v-if="loggedinUser && loggedinUser._id !== proj.createdBy._id"
      @click.stop="isApplyOpen = true"
      class="proj-apply-for-mobile"
      :class="{'apply-opened':isApplyOpen}"
    >
      <h1>Apply now</h1>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../services/eventbus-service.js";
import mapPreview from "../../components/map-preview.vue";
import projApply from "../../components/proj/proj-apply.cmp.vue";
import reviewList from "../../components/review/review-list.cmp.vue";
import reviewAdd from "../../components/review/review-add.cmp.vue";
import reviewAvarage from "../../components/review/review-avarage.cmp.vue";
import popapChat from '../../components/socket/popap-chat.vue';

export default {
  data() {
    return {
      proj: null,
      isApplyOpen: false,
      isApplyOn: false,
      isEdit: false,
      review: null,
      averageRate: null,
      colors: this.$store.getters.colors,
      active: "",
    };
  },
  async created() {
    
    const projId = this.$route.params.id;
    console.log(projId);
    
    this.proj = await this.$store.dispatch({
      type: "loadProj",
      projId
    });
    console.log(this.proj);
    await this.$store.dispatch({
      type: "loadReviews",
      id: projId
    });
    this.averageRate = this.reviews.reduce((a, b) => a + b.rate, 0);
    this.review = this.getEmptyReview();
  },
  components: {
    mapPreview,
    projApply,
    reviewList,
    reviewAdd,
    reviewAvarage,
    popapChat,
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
      review.by = this.loggedinUser
        ? this.loggedinUser
        : {
            _id: 1,
            fullName: "Anonymous",
            imgUrl: "../../assets/png/login.png"
          };
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
    onApply() {
      this.isApplyOn = true;
    },
    setActive(value) {
      this.active = this.active === value ? "" : value;
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
