<template>
  <div class="side-bar">
    <div class="map">
      <proj-map :zoomSize="zoomSize" :markers="markers" :position="position"></proj-map>
    </div>
  </div>
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
        // var pos = new Object();
        markers.push({pos: proj.position, url: proj.imgUrls[0], id: proj._id, proj: proj});
      }),
        markers.map(marker => {
          // var position = new Object();
          this.markers.push({ position: { lat: marker.pos.lat, lng: marker.pos.lng }, url: marker.url, id: marker.id, proj: marker.proj });
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

