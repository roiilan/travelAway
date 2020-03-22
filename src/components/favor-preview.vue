<template>
  <div class="favor-preview" >
    <router-link :to="'/favor/' + favor._id">
    <h5>Name: {{favor.title}} </h5>
    <h5>Description: {{favor.description}} </h5>
    <img v-bind:src=favor.imgUrls v-if="favor.imgUrls" class="details-img"/>

    <div class = "footer">
    </div>
      </router-link> |
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
    width: 25%;
}

</style>
