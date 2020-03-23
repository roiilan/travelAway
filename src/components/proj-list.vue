<template>
  <div class="proj-list" v-if="projs">
   <h1>Local projs</h1>
    <ul>
      <li v-for="(proj,index) in projs" :key="proj._id" v-if="index < 4">
        <proj-preview :proj="proj"></proj-preview>
      </li>
    </ul>
    <router-link to='/projs/' >All local projs</router-link>




<!-- <vueper-slides
  class="no-shadow"
  :visible-slides="3"
  :slide-ratio="1 / 4"
  :dragging-distance="10">
  <vueper-slide v-for="(proj,i) in projs" :key="i" :image="proj.imgUrls[0]" :title="proj.title" :content="proj.description" :link='"#/proj/" + proj._id'/>
</vueper-slides> -->
  </div>
</template>



<script>
import projPreview from "./proj-preview";
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'

export default {
  name: "projList",
    props: {
    projs: Array,
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

  components: {
    projPreview,
      // VueperSlides, 
      // VueperSlide ,
  },


};





</script>

<style  >
.proj-list ul{
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.proj-list li{
  width: 20%;
  margin: 5px;
  list-style: none;
}
.proj-list li img{
  width:100%;
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
