<template>
  <div class="walkways-app">
     <router-link to="/edit">
        Add Proj
    </router-link>
    <proj-list :projs="projs"/>
  </div>
</template>

<script>
// @ is an alias to /src
import projList from "@/components/proj-list.vue";

export default {
  name: "projApp",
  data(){
    return{
      projs:null,
    }
  },
  components: {
    projList,
  },
async created() {
     this.projs = await this.$store.dispatch({type: 'loadProjs'});
},



};
</script>


<style >
</style>