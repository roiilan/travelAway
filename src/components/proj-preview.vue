<template>
  <div class="proj-preview" >
    <router-link :to="'/proj/' + proj._id">
    <img v-bind:src=proj.imgUrls[0] v-if="proj.imgUrls" class="details-img"/>
    <h5>{{proj.title}} </h5>
    <h5>Description: {{proj.description}} </h5>

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
    width: 100%;
    height: 50%;
    object-fit: cover;
}

.proj-preview{
  height: 350px;
  width: 200px ;
  margin-left: 10px;
}

</style>
