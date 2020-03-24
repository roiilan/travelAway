<template>
  <div class="side-bar">
      <div v-for="proj in projs" class="map">
    <proj-map :zoomSize="zoomSize"
     :markers="[{ position: { lat: proj.position.lat, lng: proj.position.lng } }]" 
        :position="proj.position"> </proj-map>
        </div>
  </div>
</template>

<script>

import projMap from './proj-map.vue';

export default {
      props: {
   projs: Array
  },
      data() {
    return {
      zoomSize: 14
    }
  },
    components:{
        projMap
    }

}
</script>

<style scoped>
.map{
    height: 300px;
    border-radius: 3px;
}
</style>

