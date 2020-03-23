<template>
  <GmapMap
  v-if="position"
    :center="position"
    :zoom="11"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
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
      markers: Array
  },

};










  // data() {
  //   return {
  //     markers: [
  //       // { position: { lat: this.position.lat, lng: this.position.lng } }, !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!     
  //     ],
  //     center: { lat: this.position.lat, lng: this.position.lng }
  //   };
  // },
  // created(){
    // console.log(this.position.lat);
  // }
</script>



