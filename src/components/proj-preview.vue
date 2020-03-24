<template>
  <div class="proj-preview">
    <router-link :to="'/proj/' + proj._id" class="proj-card">

    <img v-bind:src=proj.imgUrls[0] v-if="proj.imgUrls" class="details-img"/>
    <div class="proj-txt">
    <h5>{{projCategory}}</h5>
    <h2>{{proj.title}} </h2>
    </div>

    <div class = "footer">
    </div>
      </router-link> 
    </div>
</template>


<script>

export default {
  name: 'projPreview',
  props: {
   proj: Object
  },
  computed:{
   projCategory(){
     
      if(this.proj.category[0] === "animalsAndWildlife") return "Animals & Wildlife"
    }
  }


}
</script>

<style scoped >


</style>
