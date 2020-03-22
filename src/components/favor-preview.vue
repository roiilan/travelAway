<template>
  <div class="favor-preview" >
    <router-link :to="'/favor/' + favor._id">
    <img v-bind:src=favor.imgUrls[0] v-if="favor.imgUrls" class="details-img"/>
    <h5>{{favor.title}} </h5>
    <h5>Description: {{favor.description}} </h5>

    <div class = "footer">
    </div>
      </router-link> 
    </div>
</template>




<script>




export default {
  name: 'favorPreview',
  props: {
   favor: Object
  },


}
</script>

<style scoped >
.details-img{
    width: 100%;
    height: 50%;
    object-fit: cover;
}

.favor-preview{
  height: 350px;
}

</style>
