<template>
  <GmapMap
     v-if="position"
    :center="position"
    :zoom="zoomSize"
    map-type-id="terrain"
    style="height: 500px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="false"
      :draggable="false"
      @click="center=m.position"
    />
  </GmapMap>
</template>
<script>

export default {
   props: {
   position: null,
      markers: Array,
      zoomSize:null
  },
    data() {
    return {
    };
  },
//   computed: {
// computedZoom()

//   }
  created(){
    console.log(this.position.lat);
  },

};





      // markers: [
      //   // { position: { lat: this.position.lat, lng: this.position.lng } },     
      // ],
      // center: { lat: this.position.lat, lng: this.position.lng }
</script>



