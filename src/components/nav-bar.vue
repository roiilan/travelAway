<template>
  <div class="nav-bar-container" :class="{'scrollering': isScrollering}">
    <div class="nav-bar flex a-center between">
      <div class="logo-container flex a-center j-center">
        <router-link to="/">
          <img class="logo" src="../assets/icon/help.png" alt="Logo" />
        </router-link>
      </div>
      <div class="link-container flex a-center j-center">
        <router-link to="/edit">Add Project</router-link>
        <router-link to="/">Home</router-link>
        <span v-if="loggedinUser" @click="logout">Logout</span>
        <router-link v-else to="/login">Login</router-link>

        <router-link :to="'/user/' + loggedinUser._id" v-if="loggedinUser" class="img-user-link">
          <img class="img-user" :src="loggedinUser.imgUrl" :title="loggedinUser.fullName" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrollering: false
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  watch: {
    'loggedinUser.notifications'() {
      console.log('hi!!');
    }
  },
  methods: {
    async logout() {
      var res = await this.$store.dispatch({ type: "logout" });
      if (res) {
        console.log("res: ", res);
        this.$store.commit({
          type: "setMsg",
          msg: { isShow: true, txt: "The logout operation was successful" }
        });
        this.$message({
          showClose: true,
          message: 'The logout operation was successful',
          type: 'success'
        });
        this.$notify({
          title: 'Success',
          message: 'The logout operation was successful',
          type: 'success',
          duration: 1500
        });
        // this.$router.push('/')
        return;
      }
    },
    handleScroll() {
      this.isScrollering = true;
      if (window.scrollY === 0) {
        this.isScrollering = false;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

