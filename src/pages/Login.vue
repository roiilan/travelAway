<template>
  <div class="login-page">
    <form v-if="credentials && !isSignup" class="login-card flex col" @submit.prevent="login">
      <h2>Log in to your account</h2>
      <h3>Username:</h3>
      <input ref="fullName" class="my-form" type="text" v-model="credentials.username" required />
      <h3>Password:</h3>
      <input type="password" v-model="credentials.password" required />
      <button class="login-btn" type="submit">Login</button>
      <h3>
        Don't have an account?
        <span class="login-link" @click.stop="isSignup = true">Signup</span>
      </h3>
    </form>
    <form v-if="newUserCred && isSignup" class="login-card flex col" @submit.prevent="signup">
      <myVideo v-if="playVideo" v-model="newUserCred.imgUrl"></myVideo>
      <label v-else>
        <input @change="uploadImg" type="file" hidden />
        <h3 class="login-btn flex a-center around">
          <img v-if="newUserCred.imgUrl" class="avatar avatar-m" src="../assets/svg/user-profile.svg" title="Upload Img:" />
          <img v-else class="avatar avatar-m" :src="newUserCred.imgUrl" title="Upload Img:" />
        </h3>
      </label>
      <!-- <h3>Full-Name:</h3> -->
      <input
        ref="fullName"
        type="text"
        v-model="newUserCred.fullName"
        placeholder="FullName"
        required
      />
      <!-- <h3>Username:</h3> -->
      <input
        ref="username"
        type="text"
        v-model="newUserCred.username"
        placeholder="Username"
        required
      />
      <!-- <h3>Password:</h3> -->
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
    </form>
    <!-- <ul class="login-user" v-if="users">
        <user-list 
        v-for="user in users" :key="user._id" 
        :user="user" 
        @removeUser="removeUser" 
        />
    </ul>-->
  </div>
</template>

<script>
// import { userService } from "../services/user.service.js";
import myVideo from "../components/video/my-video.vue";
// import userList from '../components/user-list.cmp.vue'

export default {
  name: "Login",
  data() {
    return {
      playVideo: false,
      credentials: null,
      newUserCreds: null,
      isSignup: false,
      params: {
        client_id:
          "638406108101-fgbubnomg43t3hvbh47v4p26tk7a7ltg.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  async created() {
    // this.users = await this.$store.dispatch({ type:'loadUsers' });
    (this.credentials = { username: "", password: "" }),
      // this.newUserCred = userService.getEmptyUser()
      (this.newUserCred = {
        username: "",
        password: "",
        fullName: "",
        imgUrl: "https://image.flaticon.com/icons/svg/1246/1246351.svg",
        isAdmin: false,
        notifications: []
      });
  },
  //     components: {
  //         // userList
  //     },
  methods: {
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
      } else {
        this.$notify({
          title: "Warning",
          message: "The username or password is incorrect",
          type: "warning",
          duration: 2500
        });
        this.reset();
        this.$refs.fullName.focus();
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
    }
  },
  components: {
    myVideo
  }
};
</script>
