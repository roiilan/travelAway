<template>
  <div class="walkways-app">
    <home/>
  </div>
</template>

<script>
import projList from "@/components/proj-list.vue";
import home from "@/views/Home.vue";

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


<style scoped >

</style>