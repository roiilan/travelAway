<template>
  <div class="walkways-app">
    <!-- <home /> -->
    <home :projs="projs" />
  </div>
</template>

<script>
import projList from "../pages/proj/proj-list.vue";
import home from "./Home.vue";

export default {
  name: "projApp",
  // data(){
  //   return{
  //     projs:null,
  //   }
  // },
  components: {
    projList,
    home
  },
  async created() {
    await this.$store.dispatch({ type: "loadReviewsCount" });
    await this.$store.dispatch({ type: "loadProjs" });
  },
  computed: {
    projs(){
      return this.$store.getters.projs
    }
  }
   
};
</script>


