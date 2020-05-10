<template>
  <div class="login-page">
    <!-- <div class="width-container">  -->
      <!-- <login-form  v-if="credentials && !isSignup" :credentials="credentials" @login="login" @goToSignup="goToSignup" /> -->
      <!-- <transition name="fade"> -->
      <form v-if="credentials && !isSignup" class="flex col" @submit.prevent="login">
        <h1>Log-in</h1>
        <input ref="username" class="my-form" type="text" v-model="credentials.username" required />
        <input type="password" v-model="credentials.password" required />
        <button class="login-btn" type="submit">Login</button>
        <h3>
          Don't have an account?
          <span class="login-link" @click.stop="isSignup = true">Signup</span>
        </h3>
      </form>
      <!-- </transition> -->
      <!-- <transition name="fade"> -->
      <form v-if="newUserCred && isSignup" class="flex col" @submit.prevent="signup">
        <transition name="fade">
          <myVideo v-if="playVideo" v-model="newUserCred.imgUrl" @stopVideo="toggleVideo"></myVideo>
        </transition>
        <h1>Sign-UP</h1>
        <section class="signup-form flex col">
          <section class="flex col">
            <input
              ref="fullName"
              type="text"
              v-model="newUserCred.fullName"
              placeholder="FullName"
              required
            />
            <input
              ref="username"
              type="text"
              v-model="newUserCred.username"
              placeholder="Username"
              required
            />
            <input
              ref="password"
              type="password"
              v-model="newUserCred.password"
              placeholder="Password"
              required
            />

            <button>Sign-Up</button>
            <h3 style="display:block; height:5px;" class="flex a-center j-center">
              Go back to
              <span class="login-link" @click.stop="isSignup = false">Login</span>
            </h3>
          </section>
          <section
            @click.stop="openSelect = !openSelect"
            :class="{'open-select':openSelect}"
            class="container-img-profile pointer flex j-center"
          >
            <img
              v-if="newUserCred.imgUrl"
              class="avatar avatar-m"
              :src="newUserCred.imgUrl"
              title="Replace profile picture"
            />
            <img
              v-else
              class="avatar avatar-m"
              src="../assets/svg/user-profile.svg"
              title="Set profile picture"
            />
            <transition name="fade">
              <section class="select" @click="openSelect = !openSelect" v-if="openSelect">
                <label>
                  <input @change="uploadImg" type="file" hidden />
                  <li class="upload">Upload a photo</li>
                </label>
                <li @click="toggleVideo">Turn on camera</li>
              </section>
            </transition>
          </section>
        </section>
      </form>
      <!-- </transition> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import { userService } from "../services/user.service.js";
import myVideo from "../components/video/my-video.vue";
import { eventBus } from "../services/eventbus-service.js";

export default {
  name: "Login",
  data() {
    return {
      playVideo: false,
      openSelect: false,
      credentials: null,
      newUserCreds: null,
      isSignup: false
      // params: {
      //   client_id:
      //     "638406108101-fgbubnomg43t3hvbh47v4p26tk7a7ltg.apps.googleusercontent.com"
      // },
      // renderParams: {
      //   width: 250,
      //   height: 50,
      //   longtitle: true
      // }
    };
  },
  async created() {
    (this.credentials = { username: "", password: "" }),
      // this.newUserCred = userService.getEmptyUser()
      (this.newUserCred = {
        username: "",
        password: "",
        fullName: "",
        imgUrl: "",
        isAdmin: false,
        notifications: []
      });
    document.addEventListener("click", this.handleClick);
    document.addEventListener("keydown", this.handlePress);
  },
  mounted() {
    this.$refs.username.focus();
  },
  destroyed() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handlePress);
  },

  methods: {
    handleClick(event) {
      if (this.openSelect) this.openSelect = false;
    },
    handlePress(event) {
      if (event.keyCode === 27) {
        this.handleClick();
      }
    },
    toggleVideo() {
      this.playVideo = !this.playVideo;
      document.body.classList.toggle("vidoe-open");
    },
    async login() {
      var user = await this.$store.dispatch({
        type: "login",
        credentials: this.credentials
      });
      if (user !== "err") {
        this.$notify({
          title: "Success",
          message: `${user.fullName} login successfully!`,
          type: "success",
          duration: 2500
        });
        this.goBack();
        eventBus.$emit("connectSockets");
      } else {
        this.$notify({
          title: "Warning",
          message: "The username or password is incorrect",
          type: "warning",
          duration: 2500
        });
        this.reset();
        this.$refs.username.focus();
      }
    },
    async signup() {
      if (this.newUserCred.fullName.length < 3) {
        this.$notify({
          title: "Warning",
          message: "Full-Name is too short",
          type: "warning",
          duration: 2500
        });
        this.$refs.fullName.focus();
        return;
      }
      if (this.newUserCred.username.length < 3) {
        this.$notify({
          title: "Warning",
          message: "Username is too short",
          type: "warning",
          duration: 2500
        });
        this.$refs.username.focus();
        return;
      }
      if (this.newUserCred.password.length < 3) {
        this.$notify({
          title: "Warning",
          message: "Password is too short",
          type: "warning",
          duration: 2500
        });
        this.$refs.password.focus();
        return;
      }
      var user = await this.$store.dispatch({
        type: "signup",
        newUserCred: this.newUserCred
      });
      this.goBack();
      eventBus.$emit("connectSockets");
    },
    reset() {
      this.credentials.username = "";
      this.credentials.password = "";
    },
    goBack() {
      this.$router.go(-1);
    },
    async uploadImg(ev) {
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      this.newUserCred.imgUrl = img.url;
    },
    async removeUser(userId) {
      var msg = await this.$store.dispatch({ type: "removeUser", userId });
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    titleCamera() {
      return this.playVideo ? "Turn off camera" : "Turn on camera";
    }
  },
  components: {
    myVideo
  }
};
</script>
