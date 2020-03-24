<template>
  <div class="proj-list-filtered" >
    <ul>
      <li v-for="(proj) in projs" :key="proj._id">
          <div class="proj-preview">
        <proj-preview :proj="proj"></proj-preview>
        </div>
      </li>
    </ul>
    <side-bar :projs="projs" class="side-bar"></side-bar>
    <!-- <router-link to='/projs/' >All local projs</router-link>  -->
  </div>
</template>



<script>
import projPreview from "../components/proj-preview.vue";
import sideBar from '../components/side-bar.vue';


export default {
  name: "projsListFiltered",

  data(){
    return{
  projs:null
    }
  },
  async created() {
     this.projs = await this.$store.dispatch({type: 'loadProjs'})
     const filter = this.$route.params.filter
     const filteredProjs = this.projs.filter(proj=>{  
       return proj.category[0] === filter
     })
     this.projs = filteredProjs
 
     
  
},


  components: {
    projPreview,
    sideBar
    
  },

};





</script>

<style scoped >
.proj-list-filtered{
    max-width: 1080px;
     margin: 0 auto;
     display: flex;
     margin-top: 110px;
  
  }
  
  li{
    list-style: none;
  }
  
  ul{
    margin: 0;
    padding: 0;
    width: 66%
  }
  
 
  
  .side-bar{
    width: 33%;
    padding: 5px;

  }
</style>
