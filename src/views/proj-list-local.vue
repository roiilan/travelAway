<template>
  <div class="proj-list-local" >
   <h1> All Local projs</h1>
    <ul>
      <li v-for="(proj) in projs" :key="proj._id">
          <div class="proj-preview">
        <proj-preview :proj="proj"></proj-preview>
        </div>
      </li>
    </ul>
    <router-link to='/projs/' >All local projs</router-link>
  </div>
</template>



<script>
import projPreview from "../components/proj-preview.vue";

export default {
  name: "projsListLocal",

  data(){
    return{
  projs:null
    }
  },
  async created() {
     this.projs = await this.$store.dispatch({type: 'loadProjs'});
},




  components: {
    projPreview,
      // VueperSlides, 
      // VueperSlide ,
  },

};





</script>

<style scoped >
.proj-list-local ul{
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.proj-list-local li{
  width: 25%;
  margin: 5px;
  list-style: none;
}

.proj-preview{
    width: 100%;
}

/* li.proj-preview{
    width:33%;
    margin: 10px
} */
/* 
.vueperslide__content-wrapper{
  color: white;
}

a{
  margin: 5px;
} */
</style>
