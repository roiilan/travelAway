<template>
<<<<<<< HEAD
  <div class="proj-list-filtered" >
    <div class = "main-content">
        <div class="header ratio-16-9"  v-if="projsHeader" > 
          <img :src=projsHeader.imgUrl>
          <div class="category-header">
         <div class="category-header-title"> {{projsHeader.title}} </div>
        <div class = "category-header-desc">  {{projsHeader.desc}} </div>
=======
  <div class="proj-list-filtered">
    <div class="main-content">
      <div class="header ratio-16-9" v-if="projsHeader">
        <img :src="projsHeader.imgUrl" />
        <div class="category-header">
          <div class="category-header-title">{{projsHeader.title}}</div>
          <div class="category-header-desc">{{projsHeader.desc}}</div>
        </div>
      </div>
      <ul>
        <li v-for="(proj) in projs" :key="proj._id">
          <div class="proj-preview" @mousemove="log(proj._id)">
           
            <proj-preview :proj="proj"></proj-preview>
>>>>>>> 59f8e89d82f0a9614a8d7621a7cca6e0456db74f
          </div>
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
    window.scrollTo(0,0)
     
  
},
methods:{
      async getHeader(filter) {
      var headerObj = await this.$store.dispatch({
        type: "getFilteredProjHeader",
        filter
      });
      
      if (headerObj) {        
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




</style>
