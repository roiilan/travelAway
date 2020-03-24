<template>
  <div id="app">
    <nav-bar/> 
<router-view/>
  <!-- <div class="msg"> -->
  <div class="msg" v-if="msg && msg.isShow">
      {{msg.txt}}
  </div>
  </div>
</template>


<script>
import navBar from "./components/nav-bar.vue"

export default {
  name:'projApp',
  computed: {
    msg() {
      return this.$store.getters.msg
    }
  },
    components: {
    navBar,
    }
};
</script>

<style>
  .msg {
    position: fixed;
    background-color: #000;
    color: #fff;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

</style>

