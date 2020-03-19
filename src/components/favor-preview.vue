<template>
  <div class="favor-preview" >
    <h5>Name: {{favor.title}} </h5>
    <h5>Description: {{favor.description}} </h5>
    <img v-bind:src=favor.imgUrl v-if="favor.imgUrl" class="details-img"/>

    <div class = "footer">
    </div>

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
