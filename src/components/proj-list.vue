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
          <h6>rate: {{proj.rate}}</h6>
        <span class = "review-container">
        <review-avarage-by-id class="review-avarage-for-list" :id="proj._id"/>   
        </span> 
        <h4>{{proj.title}}</h4>
        <h6>{{proj.description.substring(0,80) +'...'}}</h6>
</router-link>
      </li>
    </ul>
  </div>
</template>



<script>
// import projPreview from "./proj-preview";
import reviewAvarageById from './review-avarage-by-id';



export default {
  name: "projList",
  data(){
    return{
      projs:null
    }
  },
  async created(){
        this.projs = await this.$store.dispatch({type: 'loadProjs'});

  },
  components:{
reviewAvarageById
  }


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




</style>
