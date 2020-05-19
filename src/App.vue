<template>
  <div id="app">
    <div class="screen"></div>
    <nav-bar />
    <router-view />
    <!-- <home :projs="projs" :users="users"/> -->
    <main-footer/>
    <div class="msg" v-if="msg && msg.isShow">
      <button class="close-msg-btn" @click="closeMsg">X</button>
      {{msg.txt}}
    </div>
  </div>
</template>


<script>
import navBar from "./components/nav-bar.vue";
import mainFooter from "./components/footer/main-footer.vue";
import { eventBus } from "./services/eventbus-service.js";
import { utilService } from "./services/util.service.js";
import socketService from "./services/socket.service.js";
import { projService } from "./services/proj.service.js";

export default {
  name: "projApp",
  data() {
    return {
      audioNotification: null,
      user: null,
      audioNotification: null
    };
  },
  computed: {
    msg() {
      return this.$store.getters.msg;
    }
  },

  components: {
    navBar,
    mainFooter
  },
  async created() {
    console.log("app created!");
    this.audioNotification = new Audio(
      require("./assets/audio/notification.mp3")
    );
    socketService.setup();
    // await this.$store.dispatch({ type: "loadProjs" });
    // await this.$store.dispatch({ type: "loadUsers" });
    await this.$store.dispatch({ type: "loadReviewsCount" });
  },
  mounted() {
    // console.log(this.loggedinUser);
    
    eventBus.$on("connectSockets", () => this.connectSockets());
    eventBus.$on("disconnectSockets", () => this.disconnectSockets());
    eventBus.$on("removeReview", async reviewId => {
      const msg = await this.$store.dispatch({
        type: "removeReview",
        reviewId
      });
      this.reviews = this.$store.getters.reviews;
    });
    document.title = this.loggedinUser
      ? `(${this.loggedinUser.notifications.length}) Walkways`
      : "Walkways";
  },
  methods: {
    connectSockets() {
      this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      if(!this.user) return
      socketService.on(`apply ${this.user._id}`, this.pushNotification);
      socketService.on(`decline ${this.user._id}`, this.decline);
      socketService.on(`approve ${this.user._id}`, this.approve);
    },
    disconnectSockets() {
      if (!this.user) return;
      socketService.off(`apply ${this.user._id}`, this.pushNotification);
      socketService.off(`decline ${this.user._id}`, this.decline);
      socketService.off(`approve ${this.user._id}`, this.approve);
    },
    pushNotification(notification) {
      console.log("notificationnnnnn", notification);

      // var res = this.$store.dispatch({ type: "addRequest", request });
      // if (res) this.audioNotification.play();

      // eventBus.$emit("addRequest", request);

      this.user.notifications.push(notification);
      this.updateUser();
    },
    decline(notification) {      
      if (notification.from._id === this.user._id) {
        this.user.notifications.push({
          _id: utilService.makeId(),
          proj: notification.proj,
          from: notification.to,
          to: notification.from,
          txt: "Sorry, your application was disapproved..!",
          isApproved: false
        });
      } else {
        const idx = this.user.notifications.findIndex(
          currProj => currProj._id === notification._id
        );
        this.user.notifications.splice(idx, 1);
      }
        this.updateUser();
    },
    async approve(notification) {
      if (notification.from._id === this.user._id) {
        this.user.notifications.push({
          _id: utilService.makeId(),
          proj: notification.proj,
          from: notification.to,
          to: notification.from,
          txt:
            "We are pleased to inform you that you have been accepted for our project..!",
          isApproved: true
        });
      } else {
        const proj = await projService.getById(notification.proj._id);
        proj.membersApplyed.push(notification.from);
        proj.membersNeeded -= notification.memebersApllied;
        await this.$store.dispatch({ type: "saveProj", proj });
        const idx = this.user.notifications.findIndex(
          currProj => currProj._id === notification._id
        );
        this.user.notifications.splice(idx, 1);
      }
      this.updateUser();
    },
    async updateUser() {
      const updatedUser = await this.$store.dispatch({
        type: "updateUser",
        user: this.user
      });
      if (updatedUser) {
        eventBus.$emit("updateUser", updatedUser);
        this.audioNotification.play();
      } else {
        console.log("ERROR IN UPDATE USER");
      }
    }
  }
};
</script>

<style>
</style>

