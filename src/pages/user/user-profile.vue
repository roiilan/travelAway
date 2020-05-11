<template>
  <div class="user-profile width-container" v-if="user && reviews">
    <div class="main-content">
      <div>
        <div class="user-profile-inside-container flex col a-center">
          <transition name="fade">
            <myVideo v-if="playVideo" v-model="user.imgUrl" @stopVideo="playVideo = false"></myVideo>
          </transition>
          <section
            v-if="loggedinUser && loggedinUser._id === user._id"
            @click.stop="openSelect = !openSelect"
            :class="{'open-select':openSelect}"
            class="container-img container-img-profile pointer flex j-center"
          >
            <img
              v-if="user.imgUrl"
              class="avatar avatar-m"
              :src="user.imgUrl"
              title="Replace profile picture"
            />
            <img
              v-else
              class="avatar avatar-m"
              src="../../assets/svg/user-profile.svg"
              title="Set profile picture"
            />
            <transition name="fade">
              <section class="select" @click="openSelect = !openSelect" v-if="openSelect">
                <label>
                  <input @change="uploadImg" type="file" hidden />
                  <li class="upload">Upload a photo</li>
                </label>
                <li @click="playVideo = !playVideo">Turn on camera</li>
              </section>
            </transition>
          </section>
          <div v-else class="container-img">
            <img class="avatar avatar-l" :src="user.imgUrl" />
          </div>
          <div class="container-details-user flex col a-center j-center">
            <input
              class="input-fullname"
              type="text"
              v-if="loggedinUser && loggedinUser._id === user._id"
              v-model="fullName"
            />
            <p v-else>{{user.fullName}}</p>
            <p>Join At: {{user.joinAt.date}}, {{user.joinAt.time}}</p>
            <review-avarage :reviews="reviews" />
          </div>
        </div>
        <!-- <h3>count notifications: {{user.notifications.length}}</h3> -->
        <section class="notification-container" v-if="user.notifications.length">
          <!-- <p>Notifications</p> -->
          <div
            class="notification-preview"
            v-for="notification in user.notifications"
            :key="notification._id"
          >
            <div class="notification-header">
              <p>{{notification.from.fullName}}: {{notification.txt || 'I heard about your project and I really like it, can I sign up for it?'}}</p>
              <img
                src="https://image.flaticon.com/icons/svg/39/39220.svg"
                alt
                @click.prevent="deleteNotification(notification)"
              />
            </div>
            <div class="notification-details">
              <p>About the project: {{notification.proj.title}}</p>
              <p
                v-if="notification.proj.createdById === user._id"
              >Members intrested:{{notification.memebersApllied}}</p>
              <section v-if="notification.proj.createdById === user._id">
                <!-- notification:<pre>{{notification}}</pre>
                user:<pre>{{user}}</pre>-->
                <button @click="onApprove(notification)">Approve!</button>
                <button @click="onDecline(notification)">Decline</button>
              </section>
            </div>
          </div>
        </section>
        <p v-else>No notifications yet</p>
      </div>
      <map-preview class="map" :array="[user]"></map-preview>
    </div>

    <review-list v-if="reviews.length" :reviews="reviews" />

    <review-add v-if="loggedinUser && loggedinUser._id !== user._id" :review="review" @save="save" />
  </div>
</template>
<script>
import { eventBus } from "../../services/eventbus-service.js";
import { userService } from "../../services/user.service.js";
import socketService from "../../services/socket.service.js";
import mapPreview from "../../components/map-preview.vue";
import reviewList from "../../components/review/review-list.cmp.vue";
import reviewAdd from "../../components/review/review-add.cmp.vue";
import reviewAvarage from "../../components/review/review-avarage.cmp.vue";
import myVideo from "../../components/video/my-video.vue";

export default {
  data() {
    return {
      playVideo: false,
      openSelect: false,
      timeOut: null,
      fullName: null,
      user: null,
      review: null,
      projApplied: null,
      audioNotification: null
    };
  },
  async created() {
    this.audioNotification = new Audio(
      require("../../assets/audio/notification.mp3")
    );
    const userId = this.$route.params.id;
    const user = await userService.getById(userId);
    this.user = JSON.parse(JSON.stringify(user));    
    // this.user.notifications = []
    // this.updateUser()
    await this.$store.dispatch({
      type: "loadReviews",
      id: userId,
      isSetReviews: true
    });
    this.fullName = this.user.fullName;
    //   socketService.setup();
    //   socketService.on(`apply ${userId}`, this.addRequest);
    //   socketService.on(`decline ${userId}`, this.decline);
    //   socketService.on(`approve ${userId}`,this.approve);
  },
  mounted() {
    eventBus.$on("updateUser", user => {
      this.user = user;
    });
    //       eventBus.$on('addRequest', request => {
    //         this.user.notifications.push(request);
    //         this.audioNotification.play();
    //         this.updateUser();
    //     })
    //       eventBus.$on('decline', notification => {
    //         const idx = this.user.notifications.findIndex(
    //         currProj => currProj._id === notification._id
    //       );
    //       this.user.notifications.splice(idx, 1);
    //       this.audioNotification.play();
    //       this.updateUser();
    //       })
    //       eventBus.$on('approve', async notification => {
    //    const proj = await this.$store.dispatch({
    //         type: "getProjById",
    //         id: notification.proj._id
    //       });
    //       proj.membersApplyed.push(notification.from);
    //       proj.membersNeeded -= notification.memebersApllied;
    //       await this.$store.dispatch({ type: "saveProj", proj });
    //        const idx = this.user.notifications.findIndex(
    //         currProj => currProj._id === notification._id
    //       );
    //       this.user.notifications.splice(idx, 1);
    //       this.audioNotification.play();
    //       this.updateUser();
    // })
  },
  // destroyed() {
  //   socketService.off(`apply ${userId}`, this.addRequest);
  //   socketService.off(`decline ${userId}`, this.decline);
  //   socketService.off(`approve ${userId}`,this.approve);
  //   socketService.terminate();
  // },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handlePress);
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
    //   addRequest(request) {
    //   this.user.notifications.push(request);
    //   this.audioNotification.play();
    //   this.updateUser();
    // },
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
      // this.approve()
      // const proj = await this.$store.dispatch({
      //   type: "getProjById",
      //   id: notification.proj._id
      // });
      // proj.membersApplyed.push(notification.from);
      // proj.membersNeeded -= notification.memebersApllied;
      // await this.$store.dispatch({ type: "saveProj", proj });
      // this.decline(notification);
    },
    // async approve(notification){
    //   const proj = await this.$store.dispatch({
    //     type: "getProjById",
    //     id: notification.proj._id
    //   });
    //   proj.membersApplyed.push(notification.from);
    //   proj.membersNeeded -= notification.memebersApllied;
    //   await this.$store.dispatch({ type: "saveProj", proj });
    //    const idx = this.user.notifications.findIndex(
    //     currProj => currProj._id === notification._id
    //   );
    //   this.user.notifications.splice(idx, 1);
    //   this.audioNotification.play();
    //   this.updateUser();
    // },
    handleClick(event) {
      if (this.openSelect) this.openSelect = false;
    },
    handlePress(event) {
      if (event.keyCode === 27) {
        this.handleClick();
      }
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
    myVideo
  },
  watch: {
    loggedinUser() {
      // document.title = `(${this.loggedinUser.notifications.length}) Walkways`;
      if (!this.loggedinUser) {
        this.$router.push("/");
      }
    },
    user() {
      console.log("I'm watch on user");
    },
    fullName: {
      handler() {
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