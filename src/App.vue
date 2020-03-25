<template>
  <div id="app">
    <nav-bar/> 
    <router-view/>
    <div class="msg" v-if="msg && msg.isShow">
        <button class="close-msg-btn" @click="closeMsg">X</button>
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
  methods: {
    closeMsg(){
      this.$store.commit({type: 'closeMsg', msg: {isShow: false, txt: ''}})
    }
  },
    components: {
    navBar,
    }
};
</script>

<style>
  

</style>

