<template>
  <div class="favor-list" v-if="favors">
    <ul v-if="!allFavors">
      <li v-for="(favor,index) in favors" :key="favor._id" v-if="index < 4">
        <favor-preview :favor="favor"></favor-preview>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(favor) in favors" :key="favor._id">
        <favor-preview :favor="favor"></favor-preview>
      </li>
    </ul>
    <router-link to='/favors/' @click.native="revealAllFavors">All favors</router-link>




<!-- <vueper-slides
  class="no-shadow"
  :visible-slides="3"
  :slide-ratio="1 / 4"
  :dragging-distance="10">
  <vueper-slide v-for="(favor,i) in favors" :key="i" :image="favor.imgUrls[0]" :title="favor.title" :content="favor.description" :link='"#/favor/" + favor._id'/>
</vueper-slides> -->
  </div>
</template>



<script>
import favorPreview from "./favor-preview";
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'

export default {
  name: "favorsList",
    props: {
    favors: Array,
  },
  data(){
    return{
      allFavors:false
    }
  },
//   data: () => ({
//   slides: [
//     {
//       title: 'Slide #1',
//       content: 'Slide content.',
//       _id:null
//     }
//   ]
// }),
methods:{
revealAllFavors(){
  console.log(this.allFavors);
  this.allFavors = !this.allFavors
  
}
},
destroyed(){
  this.allFavors = false
},


  components: {
    favorPreview,
      // VueperSlides, 
      // VueperSlide ,
  },

};





</script>

<style  >
.favor-list ul{
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.favor-list li{
  width: 20%;
  margin: 5px;
  list-style: none;
}
/* 
.vueperslide__content-wrapper{
  color: white;
}

a{
  margin: 5px;
} */
</style>
