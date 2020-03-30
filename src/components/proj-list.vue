<template>
  <div class="proj-list" v-if="projs" >
   <h1>BE THE CHANGE. BE A GLOBAL VOLUNTEER ABROAD.
</h1>
   <ul class="around-the-world-list">
      <li v-for="proj in projs" :key="proj._id" class="list-card" >

<router-link :to="'/proj/' + proj._id">
        <div class="list-projs-img-conatainer ratio-card">
        <img :src="proj.imgUrls[0]" class="proj-preview-img" >
        <div class = "list-projs-country-details">
        <img :src="`https://www.countryflags.io/${proj.position.short_country}/shiny/64.png`" v-if="proj.position.short_country" class="world-proj-flag">
        <h5 v-if="proj.position.city">{{proj.position.city}},</h5>
        <h5 v-else>{{proj.position.region}},</h5>
        <h5>{{proj.position.country}}</h5>
            </div>
        </div>
        <h5>{{proj.title}}</h5>
        <h6>{{proj.description.substring(0,80) +'...'}}</h6>
</router-link>
      </li>
    </ul>




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
     this.getHeader(filter)
    window.scrollTo(0,0)       
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
