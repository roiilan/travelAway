<template>
<div>

<div>
Logo
</div>

    <div class="nav-bar">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">
      <span v-if="loggedinUser">Logout</span> 
      <span v-else>Login</span> 
      </router-link> 
    </div>

<div>
  <h2 v-if="loggedinUser">Hello {{loggedinUser.fullName}}</h2>
  <h2 v-else>Hello guest</h2>
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

