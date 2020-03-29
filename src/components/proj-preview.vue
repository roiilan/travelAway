<template>
  <div class="proj-preview">

    <router-link :to="'/proj/' + proj._id" class="proj-card">
    <img v-bind:src=proj.imgUrls[0] v-if="proj.imgUrls" class="details-img"/>
    <div class="proj-txt">
      <div class="proj-txt-header">
    <!-- <h5>{{projCategory}}</h5> -->
    <h2>{{proj.title}} </h2>
    <div class="organiztion-container">
    <h5>{{proj.organization}}</h5>
    <img src="../../img/icon.svg"/>
    </div>
    </div>
    <div class = "members-needed">
     <h5> Members Applied:</h5>
     <h5>{{proj.membersApplyed.length}}/{{proj.membersNeeded}}</h5>
    <!-- <div class = "user-img" v-for="i in proj.membersNeeded">
       <img src="../../img/voulnteer.png"/>
    </div> -->

</div>
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
     var category = this.proj.category
     var categoryTxt ={
       "animalsAndWildlife" : "Animals & Wildlife",
       "education":"Education",
       "childcare": "Child Care",
       "environmentalProtection":"Environmental Protection",
       "farming":"Farming",
       "scubaDiving": "Scuba Diving",
       "humanitarian":"Humanitarian",
       "healthcare":"Healthcare",
       "sports":"Sports",
       "art":"Art",
       "humanRights":"Human Rights"
     }
     return categoryTxt[category]
     
    }
  }


}
</script>

<style scoped >

  


</style>
