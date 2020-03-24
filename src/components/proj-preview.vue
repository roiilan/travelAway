<template>
  <div class="proj-preview" >
    <router-link :to="'/proj/' + proj._id" class="proj-card">

    <img v-bind:src=proj.imgUrls[0] v-if="proj.imgUrls" class="details-img"/>
    <div class="proj-txt">
    <h2>{{proj.title}} </h2>
    <h5>Description: {{proj.description}} </h5>

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


}
</script>

<style scoped >
.details-img{
    width: 33%;
    height: 10rem;
    object-fit: cover;
    mix-blend-mode: multiply;
    filter: grayscale(0.5);
    border-radius: 3px;
}

.proj-card{
  display: flex;
  flex-direction: row;
  /* margin: 5px; */
}

.proj-txt{
  padding: 5px;
}

h5, h2{
  margin: 0;
}

.proj-preview{
  padding: 5px;
}


</style>
