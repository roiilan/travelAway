<template>
  <GmapMap
  v-if="position"
    :center="center"
    :zoom="16"
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
   position: null
  },
  data() {
    return {
      markers: [
        { position: { lat: this.position.lat, lng: this.position.lng } },      
      ],
      center: { lat: this.position.lat, lng: this.position.lng }
    };
  },
  created(){
    // console.log(this.position.lat);
  }
};





// export default {
//   data() {
//     return {
//       markers: [
//         { position: { lat: 33.088007, lng: 34.8031678 } },
//         { position: { lat: 33.088007, lng: 35.8031678 } }
//       ],
//       center:{ lat: 34.088007, lng: 34.8031678 }
//     };
//   }
// };
</script>



