<template>
  <div class="side-bar">
      <div class="map">
    <proj-map :zoomSize="zoomSize" :markers="markers" :position="position"> </proj-map>
  </div>
  </div>
</template>

<script>

import projMap from './proj-map.vue';

export default {
      props: {
   projs: Array,
  },
      data() {
    return {
      zoomSize:1.5,
      markers:[],
      position:{
       txtAdress:null,
       lat:33.886917,
       lng:9.537499
   }
   }
  },

    components:{
        projMap
    },
    methods:{
        getMarkers(){
           var markers = []
           this.projs.map(proj=>{       
             markers.push(proj.position)
            }),
            markers.map(marker=>{
                var position = new Object();  
                this.markers.push({ position: { lat: marker.lat, lng: marker.lng } })
            })
        }
    },
    created(){
        this.getMarkers()  
    }

}
</script>

<style scoped>

</style>

