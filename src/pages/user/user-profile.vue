<template>
  <div class="user-profile width-container" v-if="user && reviews">
    <div class="main-content">
      <div>
        <div class="user-profile-inside-container flex col a-center">
          <label class="pointer container-img" v-if="loggedinUser._id === user._id">
            <input @change="uploadImg" type="file" hidden />
            <img class="avatar avatar-l" :src="user.imgUrl" title="Replace your profile picture" />
          </label>
          <div v-else class="container-img">
            <img class="avatar avatar-l" :src="user.imgUrl" />
          </div>
          <div class="container-details-user flex col a-center j-center">
            <input
              class="input-fullname"
              type="text"
              v-if="loggedinUser._id === user._id"
              v-model="fullName"
            />
            <p v-else>{{user.fullName}}</p>
            <!-- <pre>{{user}}</pre> -->
            <p>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}</p>
            <review-avarage :reviews="reviews" />
          </div>
        </div>
        <section v-if="user.notifications">
          <p v-if="user.notifications.length">Notifications</p>
          <p v-else>No notifications yet</p>
          <div v-for="notification in user.notifications" :key="notification">
            <p>Project Name:{{notification.projTitle}}</p>
            <p>By:{{notification.member.username}}</p>
            <p>Members intrested:{{notification.memebersApllied}}</p>
            <p>Free txt:{{notification.freeTxt}}</p>
            <button @click="approve">Approve!</button>
            <button @click="decline">Decline</button>
          </div>
        </section>
      </div>
      <map-preview class="map" :array="[user]"></map-preview>
      <!-- <map-preview class="map" :array="[user]" :tempZoom="zoomSize"></map-preview> -->
    </div>

    <review-list v-if="reviews.length" :reviews="reviews" />

    <review-add v-if="loggedinUser && loggedinUser._id !== user._id" :review="review" @save="save" />
  </div>
</template>
<script>
import { userService } from "../../services/user.service.js";
import mapPreview from "../../components/map-preview.vue";
import reviewList from "../../components/review/review-list.cmp.vue";
import reviewAdd from "../../components/review/review-add.cmp.vue";
import reviewAvarage from "../../components/review/review-avarage.cmp.vue";
import { eventBus } from "../../services/eventbus-service.js";

export default {
  data() {
    return {
      timeOut: null,
      fullName: null,
      user: null,
      review: null,
      // markers: [],
      zoomSize: 12,
      // colors: this.$store.getters.colors,
      // value: null,
      projApplied: null
    };
  },
  async created() {
    const userId = this.$route.params.id;
    const user = await userService.getById(userId);
    await this.$store.dispatch({
      type: "loadReviews",
      id: userId
    });
    this.user = JSON.parse(JSON.stringify(user));
    // this.value =
      this.reviews.reduce((a, b) => a + b.rate, 0) / this.reviews.length;
    this.review = this.getEmptyReview();
    // this.markers.push({
    //   position: { lat: this.user.position.lat, lng: this.user.position.lng }
    // });
  },
  methods: {
    async save(review) {
      var reviews = await this.$store.dispatch({
        type: "saveReview",
        review
      });
      this.review = this.getEmptyReview();
    },
    async uploadImg(ev) {
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      this.user.imgUrl = img.url;
      await this.updateUser()
    },
    async updateUser() {
      await this.$store.dispatch({ type: "updateUser", user: this.user });
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
    },
    decline() {
      console.log("declined");
      this.user.notifications = [];
      // userService.update(this.user)
      this.$store.dispatch({ type: "updateUser", user: this.user });
      console.log(this.user);
    },
    async approve() {
      const desiredProj = await this.$store.dispatch({
        type: "getProjById",
        id: this.user.notifications[0].projId
      });
      desiredProj.membersApplyed.push(this.user.notifications[0].member) *
        this.user.notifications[0].memebersApllied;
      await this.$store.dispatch({ type: "saveProj", proj: desiredProj });
      this.user.notifications = [];
      console.log("approoved", desiredProj);
    }
  },
  mounted() {
    eventBus.$on("updateReview", async review => {
      await this.save(review);
    });
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    reviews() {
      return this.$store.getters.reviews;
    }
  },
  components: {
    mapPreview,
    reviewList,
    reviewAdd,
    reviewAvarage
  },
  watch: {
    loggedinUser() {
      if (!this.loggedinUser) {
        this.$router.push("/");
      }
    },
    fullName: {
      handler() {
        if (this.timeOut) {
          clearTimeout(this.timeOut);
          this.timeOut = null;
        }
        this.timeOut = setTimeout(() => {
          this.user.fullName = this.fullName
          this.updateUser();
        }, 3000);
      },
      deep: true
    }
  }
};
</script>