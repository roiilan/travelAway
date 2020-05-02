<template>
  <!-- <div class="side-bar"> -->
      <proj-map :zoomSize="zoomSize" :markers="markers" :position="position"></proj-map>
  <!-- </div> -->
</template>

<script>
import projMap from "./proj-map.vue";

export default {
  props: {
    projs: Array
  },
  data() {
    return {
      zoomSize: 1.5,
      markers: [],
      position: {
        txtAdress: null,
        lat: 33.886917,
        lng: 9.537499
      }
    };
  },

  components: {
    projMap
  },
  methods: {
    getMarkers() {
      var markers = [];
      this.projs.map(proj => {
      markers.push({pos: proj.position, proj: proj});
      }),
        markers.map(marker => {
        this.markers.push({ position: { lat: marker.pos.lat, lng: marker.pos.lng }, proj: marker.proj });
        });
    }
  },
  created() {
    this.getMarkers();
  }
};
</script>

<style scoped>
</style>

