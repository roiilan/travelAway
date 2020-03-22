<template>
  <div class="favor-list-local" >
   <h1> All Local favors</h1>
    <ul>
      <li v-for="(favor) in favors" :key="favor._id">
          <div class="favor-preview">
        <favor-preview :favor="favor"></favor-preview>
        </div>
      </li>
    </ul>
    <router-link to='/favors/' >All local favors</router-link>
  </div>
</template>



<script>
import favorPreview from "../components/favor-preview.vue";

export default {
  name: "favorsListLocal",

  data(){
    return{
  favors:null
    }
  },
  async created() {
     this.favors = await this.$store.dispatch({type: 'loadFavors'});
},




  components: {
    favorPreview,
      // VueperSlides, 
      // VueperSlide ,
  },

};





</script>

<style scoped >
.favor-list-local ul{
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.favor-list-local li{
  width: 25%;
  margin: 5px;
  list-style: none;
}

.favor-preview{
    width: 100%;
}

/* li.favor-preview{
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
