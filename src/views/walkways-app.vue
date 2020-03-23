<template>
  <div class="walkways-app">
     <router-link to="/edit">
        Add Proj
    </router-link>
    <proj-list :projs="projs"/>
    <home/>
  </div>
</template>

<script>
// @ is an alias to /src
import projList from "@/components/proj-list.vue";
import home from "@/views/home.vue";

export default {
  name: "projApp",
  data(){
    return{
      projs:null,
    }
  },
  components: {
    projList,
    home
  },
async created() {
     this.projs = await this.$store.dispatch({type: 'loadProjs'});
},



};
</script>


<style >
</style>