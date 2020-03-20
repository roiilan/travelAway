<template>
<div>
Form: <input type="text" v-model="origin">
To: <input type="text" v-model="destination">  
<iframe v-if="origin" width="100%" height="300px" v-bind:src="src()"> </iframe>

 </div>
</template>


<script>

export default {
  data() {
    return {
      origin: "italy",
      destination: "france",
      url: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAfOgP37XV4mv6RcyxIwOk1ajVevIhN2TM"
    }
  }, 
    methods:{
src:function(){
return this.url+"&origin="+origin+"&destination="+this.destination;
},
    },
     
}
</script>




<style lang="scss">
</style>
