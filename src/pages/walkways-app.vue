<template>
  <div class="walkways-app">
    <!-- <home :projs="projs" :users="users"/> -->
  </div>
</template>

<script>
// import projList from "../pages/proj/proj-list.vue";
// import home from "./Home.vue";

export default {
  name: "projApp",
  data(){
    return{
      projs: null,
      users: [],
      loggedinUser:null
    }
  },
  components: {
    // projList,
    // home
  },
  async created() {
    console.log('walkways created');
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    await this.$store.dispatch({ type: "loadReviewsCount" });
    this.projs = await this.$store.dispatch({ type: "loadProjs" });
  },
};
</script>


