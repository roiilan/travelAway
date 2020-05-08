<template>
  <div id="app">
    <div class="screen"></div>
    <nav-bar />
    <router-view />
    <div class="msg" v-if="msg && msg.isShow">
      <button class="close-msg-btn" @click="closeMsg">X</button>
      {{msg.txt}}
    </div>
  </div>
</template>


<script>
import navBar from "./components/nav-bar.vue";
import { eventBus } from "./services/eventbus-service.js";
import socketService from "./services/socket.service.js";

export default {
  name: "projApp",
  data() {
    return {
      audioNotification: null
    };
  },
  computed: {
    msg() {
      return this.$store.getters.msg;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    closeMsg() {
      this.$store.commit({ type: "closeMsg", msg: { isShow: false, txt: "" } });
    }
  },
  components: {
    navBar
  },
  created() {
    socketService.setup();
    if (this.loggedinUser) this.connectSockets();
    this.audioNotification = new Audio(
      require("./assets/audio/notification.mp3")
    );
  },
  mounted() {
    eventBus.$on("connectSockets", () => this.connectSockets());
    eventBus.$on("disconnectSockets", () => this.disconnectSockets());
    eventBus.$on("removeReview", async reviewId => {
      console.log("removeReview");

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
  destroyed() {
    if (this.loggedinUser) this.disconnectSockets();
    socketService.terminate();
  },
  methods: {
    connectSockets() {
      console.log("connectSockets");
      socketService.on(`apply ${this.loggedinUser._id}`, this.addRequest);
      socketService.on(`decline ${this.loggedinUser._id}`, this.decline);
      socketService.on(`approve ${this.loggedinUser._id}`, this.approve);
    },
    disconnectSockets() {
      console.log("disconnectSockets");
      socketService.off(`apply ${this.loggedinUser._id}`, this.addRequest);
      socketService.off(`decline ${this.loggedinUser._id}`, this.decline);
      socketService.off(`approve ${this.loggedinUser._id}`, this.approve);
    },
    addRequest(request) {
      // var res = this.$store.dispatch({ type: "addRequest", request });
      // if (res) this.audioNotification.play();

      eventBus.$emit("addRequest", request);
    },
    decline(notification) {
      eventBus.$emit("decline", notification);
    },
    approve(notification) {
      eventBus.$emit("approve", notification);
    }
  }
  //   this.audioNotification = new Audio(require('./assets/audio/notification.mp3'))
  //   const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
  //   socketService.setup();

  //   socketService.on(user._id, async request => {
  //     user.notifications.push(request);
  //     // this.user = user;
  //     this.audioNotification.play()

  //     await this.$store.dispatch({ type: "updateUser", user });    });
  // watch: {
  //   loggedinUser: {
  //     hendler() {
  //       document.title = this.loggedinUser.notifications.length;
  //     },
  //     deep: true
  //   }
  // },
};
</script>

<style>
</style>

