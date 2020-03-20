<template>
  <div class="favor-app">
<<<<<<< HEAD
    <favor-list :favors="favors"/>
=======
    <router-link to="/edit">
    Add Favor
    </router-link>
    <favor-list />
>>>>>>> 660a425d7d8ec5e23235bad6a61b59540b6e8a41
  </div>
</template>

<script>
// @ is an alias to /src
import favorList from "@/components/favor-list.vue";

export default {
  name: "favorApp",
  data(){
    return{
      favors:null
    }
  },
  components: {
    favorList,
  },
async created() {
     this.favors = await this.$store.dispatch({type: 'loadFavors'});
},

};
</script>


<style >
</style>