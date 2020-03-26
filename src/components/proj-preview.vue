<template>
  <div class="proj-preview">

    <router-link :to="'/proj/' + proj._id" class="proj-card">
    <img v-bind:src=proj.imgUrls[0] v-if="proj.imgUrls" class="details-img"/>
    <div class="proj-txt">
      <div class="proj-txt-header">
    <h5>{{projCategory}}</h5>
    <h2>{{proj.title}} </h2>
    </div>
    <div class = "members-needed">
     <h5> Members Needed:</h5>
    <div class = "user-img" v-for="i in proj.membersNeeded">
       <img src="../../img/voulnteer.png"/>
    </div>

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
     console.log(this.proj.category);
      if(this.proj.category === "animalsAndWildlife") return "Animals & Wildlife"
      if(this.proj.category === "education") return "Education"
    }
  }


}
</script>

<style scoped >

  


</style>
