<template>
  <div class="favor-app">
     <router-link to="/edit">
        Add Favor
    </router-link>
    <favor-list :favors="favors"/>
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