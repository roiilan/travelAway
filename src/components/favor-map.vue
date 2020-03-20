<template>
  <GmapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>
<script>


export default {
  data() {
    return {
      markers: [
        { position: { lat: 33.088007, lng: 34.8031678 } },
        { position: { lat: 33.088007, lng: 35.8031678 } }
      ],
      center:{ lat: 34.088007, lng: 34.8031678 }
    };
  }
};
</script>



