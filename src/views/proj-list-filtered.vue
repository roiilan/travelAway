<template>
  <div class="proj-list-filtered" >
    <ul>
      <li v-for="(proj) in projs" :key="proj._id">
          <div class="proj-preview">
        <proj-preview :proj="proj"></proj-preview>
        </div>
      </li>
    </ul>
    <side-bar :projs="projs" class="side-bar" v-if="projs"></side-bar>
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
       return proj.category === filter
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



</style>
