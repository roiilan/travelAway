<template>
  <div class="proj-list-filtered" >
    <div class = "main-content">
        <div class="category-header" v-if="projsHeader"> 
          {{projsHeader.title}}
          <img :src=projsHeader.imgUrl>
          {{projsHeader.desc}}
    </div>
    <ul>
      <li v-for="(proj) in projs" :key="proj._id">
          <div class="proj-preview">
        <proj-preview :proj="proj"></proj-preview>
        </div>
      </li>
    </ul>
    </div>
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
  projs:null,
  projsHeader:null
    }
  },
  async created() {
     this.projs = await this.$store.dispatch({type: 'loadProjs'})
     const filter = this.$route.params.filter
     const filteredProjs = this.projs.filter(proj=>{  
       return proj.category === filter
     })
     this.projs = filteredProjs
     this.getHeader(filter)
     
  
},
methods:{
      async getHeader(filter) {
      //  var txt =proj.position.txtAddress
      var headerObj = await this.$store.dispatch({
        type: "getFilteredProjHeader",
        filter
      });
      
      if (headerObj) {
        console.log(headerObj);
        
        this.projsHeader = headerObj;
        
      }
    }
},
  components: {
    projPreview,
    sideBar
    
  },

};





</script>

<style scoped >

img{
  width:25%
}


</style>
