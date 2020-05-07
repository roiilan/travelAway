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

export default {
  name: "projApp",
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
  mounted() {
    eventBus.$on("removeReview", async reviewId => {
      const msg = await this.$store.dispatch({
        type: "removeReview",
        reviewId
      });
      this.reviews = this.$store.getters.reviews;
    });
    document.title = `(${this.loggedinUser.notifications.length}) Walkways`;
  },
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

