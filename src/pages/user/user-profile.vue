<template>
  <transition name="fade">
    <div class="user-profile width-container height-container" v-if="user">
      <div class="main-content">
        <div>
          <div class="user-profile-inside-container flex col a-center">
            <!-- CMP AVATAR OF USER ---- EDIT-MODE-->
            <avatar-edit v-if="loggedinUser && loggedinUser._id === user._id" :url="user.imgUrl" />
            <!-- V-ELSE: IMG AVATAR OF USER --- SHOW-MODE-->
            <div v-else class="container-img">
              <img class="avatar avatar-m" :src="user.imgUrl" />
            </div>

            <div class="container-details-user flex col">
              <!-- FULLNAME  -->
              <!-- EDIT-MODE -->
              <input
                class="input-fullname"
                type="text"
                v-if="loggedinUser && loggedinUser._id === user._id"
                v-model="fullName"
              />
              <!--  SHOW-MODE -->
              <p v-else>{{user.fullName}}</p>

              <!-- JOIN-AT -->
              <p>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}</p>

              <!--CMP AVARAGE REVIEW OF USER-->
              <review-avarage v-if="reviews" :reviews="reviews" />
            </div>
          </div>
          <section v-if="projs">
            <div @click="scrollTo" class="flex a-center bet">
              <h3 class="container-link-img flex bet">
                <section>
                  <img class="link-img" src="../../assets/svg/link.svg" alt />
                  <span>{{user.fullName}}'s projects</span>
                </section>
                <!-- <img class="edit-mode" v-if="editMode" src="../../assets/svg/pen2.svg" alt="Edit" /> -->
              </h3>
            </div>
            <div  class="user-projs-container">
              <user-projs v-for="proj in projs" :key="proj._id" :proj="proj" />
            </div>
          </section>

          <!--CMP NOTIFICATIONS OF USER-->
          <notification-list
            v-if="user.notifications"
            :notifications="user.notifications"
            :userId="user._id"
          />
        </div>
      </div>

      <!--CMP ADD REVIEW-->
      <review-add
        v-if="!loggedinUser || (loggedinUser && loggedinUser._id !== user._id)"
        :review="review"
        @save="save"
      />

      <!--CMP LIST REVIEWS-->
      <review-list v-if="reviews && reviews.length" :reviews="reviews" />

      <!--CMP LOCATION OF USER-->

      <div @click="scrollTo" class="flex a-center bet">
        <h3 class="container-link-img flex bet">
          <section>
            <img class="link-img" src="../../assets/svg/link.svg" alt />
            <span>Location</span>
          </section>
          <!-- <img class="edit-mode" v-if="editMode" src="../../assets/svg/pen2.svg" alt="Edit" /> -->
        </h3>
      </div>
      <map-preview class="map" :array="[user]"></map-preview>
    </div>

    <!--PAGE LOADING-->
    <div class="height-container width-contianer flex a-center j-center" v-else>
      <img class="loading-page" src="../../assets/svg/loading.svg" alt />
    </div>
  </transition>
</template>
<script>
import { eventBus } from "../../services/eventbus-service.js";
import { userService } from "../../services/user.service.js";
import socketService from "../../services/socket.service.js";
import mapPreview from "../../components/map-preview.vue";
import reviewList from "../../components/review/review-list.cmp.vue";
import reviewAdd from "../../components/review/review-add.cmp.vue";
import reviewAvarage from "../../components/review/review-avarage.cmp.vue";
import notificationList from "../../components/notification/notification-list.vue";
import avatarEdit from "../../components/video/avatar-edit.vue";
import userProjs from "../../components/user/user.projs.vue";

export default {
  name: "UserProfile",

  data() {
    return {
      timeOut: null,
      fullName: null,
      user: null,
      review: null,
      projApplied: null,
      projs: null,
      audioNotification: null
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.audioNotification = new Audio(
      require("../../assets/audio/notification.mp3")
    );

    const userId = this.$route.params.id;
    const user = await userService.getById(userId);
    this.user = JSON.parse(JSON.stringify(user));
    this.imgUrl = user.imgUrl;
    await this.$store.dispatch({
      type: "loadReviews",
      id: userId,
      isSetReviews: true
    });
    this.fullName = this.user.fullName;
    this.review = this.getEmptyReview();
    this.projs = await this.$store.dispatch({
      type: "loadProjs",
      filterBy: { creators: user.fullName }
    });
  },
  mounted() {
    eventBus.$on("updateUser", user => (this.user = user));

    eventBus.$on("deleteNotification", this.deleteNotification);
    eventBus.$on("onApprove", this.onApprove);
    eventBus.$on("onDecline", this.onDecline);

    eventBus.$on("uploadImg", this.uploadImg);
  },
  beforeDestroy() {
    eventBus.$off("updateUser", user => (this.user = user));

    eventBus.$off("deleteNotification", this.deleteNotification);
    eventBus.$off("onApprove", this.onApprove);
    eventBus.$off("onDecline", this.onDecline);
    eventBus.$off("uploadImg", this.uploadImg);
  },
  methods: {
    scrollTo(ev) {
      window.scrollTo(0, ev.target.offsetTop - 200);
    },
    async save(review) {
      await this.$store.dispatch({
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
      await this.updateUser();
    },
    async updateUser() {
      var updatedUser = await this.$store.dispatch({
        type: "updateUser",
        user: this.user
      });
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
    onDecline(notification) {
      socketService.emit("decline", notification);
    },
    decline(notification) {
      const idx = this.user.notifications.findIndex(
        currProj => currProj._id === notification._id
      );
      this.user.notifications.splice(idx, 1);
      this.audioNotification.play();
      this.updateUser();
    },
    deleteNotification(notification) {
      const idx = this.user.notifications.findIndex(
        currProj => currProj._id === notification._id
      );
      this.user.notifications.splice(idx, 1);
      this.updateUser();
    },
    onApprove(notification) {
      socketService.emit("approve", notification);
    }
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
    reviewAvarage,
    notificationList,
    avatarEdit,
    userProjs
  },
  watch: {
    loggedinUser() {
      if (!this.loggedinUser) {
        this.$router.push("/");
      }
    },
    user() {
      console.log("I'm watch on user");
    },
    fullName: {
      handler() {
        if (
          !this.loggedinUser ||
          (this.loggedinUser && this.loggedinUser._id !== this.user._id)
        ) {
          return;
        }
        if (this.timeOut) {
          clearTimeout(this.timeOut);
          this.timeOut = null;
        }
        this.timeOut = setTimeout(() => {
          this.user.fullName = this.fullName;
          this.updateUser();
        }, 3000);
      },
      deep: true
    }
  }
};
</script>