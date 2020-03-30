<template>
<div class="container-map">
  {{markerOptions.url}}
  <transition name="fade">
  <img 
  class="img-on-map" 
  v-if="isShow" :src="url" 
  alt="" 
  :style="`top:${y}px; left:${x}px`">
  <!-- <img 
  @mouseover="holdImg"
  @mouseout="closeImg" 
  class="img-on-map" 
  v-if="isShow" :src="url" 
  alt="" 
  :style="`top:${y}px; left:${x}px`"> -->
  </transition>
  <GmapMap v-if="position" style="height: 500px" :center="position" :zoom="zoomSize" map-type-id="terrain">
    <!-- style="height: 500px" -->
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :ref="`marker${index}`"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :icon="markerOptions"
      @mouseover="openImg(m, index, $event)"
      @mouseout="closeImg"
      @click="openDetails(m)"
    />
    <!-- <GmapMarker
      class="marker-hover"
      :position="pos"
      :clickable="true"
      :draggable="false"
      :icon="markerlight"
      @mouseover="holdImg"
      @mouseout="closeImg"

    /> -->
  </GmapMap>
</div>
</template>
<script>
const mapMarker = require("../assets/icon/airport.png");
const lightMarker = require("../assets/icon/airport-right.png");


export default {
  props: {
    position: null,
    markers: Array,
    zoomSize: null
  },
  data() {
    return {
      markerOptions: {
        url: lightMarker,
        size: { width: 60, height: 90, f: "px", b: "px" },
        scaledSize: { width: 40, height: 45, f: "px", b: "px" }
      },
      // markerlight: {
      //   url: mapMarker,
      //   size: { width: 60, height: 90, f: "px", b: "px" },
      //   scaledSize: { width: 40, height: 45, f: "px", b: "px" }
      // },
      url: null,
      x: 0,
      y: 0,
      isShow: false,
      // pos: {lat:34,lng: 34},
    };
  },
  created() {
  },
 
  methods: {
    openImg(m, index ,$event) {
      this.x = $event.tb.pageX
      this.y = $event.tb.pageY
      this.isShow = true
      // this.pos = m.position 
      this.url = m.url
    },
    // holdImg(){
    //   this.isShow = true
    // },
    closeImg() {
      this.isShow = false
    },
    openDetails(m){
      this.$router.push('/proj/' + m.id)
    }
  }
};
</script>

<style>
.marker-hover{
  /* z-index: 1200; */
}

</style>



