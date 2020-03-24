<template>
  <div class="nav-bar flex a-center between">
    <div class="logo-container flex a-center">

      <router-link to="/">
      <img class="logo" 
      src="../assets/icon/help.png" 
      alt="Logo">
      </router-link>
      
      <router-link :to="'/user/' + loggedinUser._id" v-if="loggedinUser" >
      <img 
      class="img-user" 
      :src="loggedinUser.imgUrl" 
      :title="loggedinUser.fullName">
      </router-link>

      <!-- <img v-else 
      class="img-user" 
      src="../assets/icon/login.png" 
      title="Hello Guest"> -->

      <!-- <h2 v-if="loggedinUser">Hello {{loggedinUser.fullName}}</h2>
      <h2 v-else>Hello guest</h2> -->
    </div>
    <div class="link-container">
      <router-link to="/edit">Add</router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/login">
      <span v-if="loggedinUser">Logout</span> 
      <span v-else>Login</span> 
      </router-link> 
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedinUser(){
      return this.$store.getters.loggedinUser;
    }
  },
}
</script>

