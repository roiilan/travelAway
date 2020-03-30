<template>
  <div class="container-map">
    <div v-if="isShow" title="Click to view project details" @click="openDetails(proj._id)" class="img-on-map-container" :style="`top:${y}px; left:${x}px`">
      <div>
        <!-- <transition name="fade"> -->
          <el-carousel class="ratio-16-9">
          <el-carousel-item
            v-for="url in proj.imgUrls"
            :key="url"
          >
            <img :src="url" class="img-on-map" />
          </el-carousel-item>
        </el-carousel>
        <!-- </transition> -->
        <div class="proj-contnet-for-map">
        <h4>{{proj.organization}}</h4>
        <h5>{{proj.title}}</h5>
        <review-avarage-by-id class="review-avarage-for-map" :id="proj._id" />
        </div>
      </div>
    </div>
    <!-- <h3>{{url}}</h3> -->
    <!-- <img 
  @mouseover="holdImg"
  @mouseout="closeImg" 
  class="img-on-map" 
  v-if="isShow" :src="url" 
  alt="" 
    :style="`top:${y}px; left:${x}px`">-->
    <GmapMap
      v-if="position"
      style="height: 500px"
      :center="position"
      :zoom="zoomSize"
      map-type-id="terrain"
    >
      <!-- style="height: 500px" -->
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :ref="`marker${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="markerOptions"
        @click="openImg(m, index, $event)"
      />
      <!-- <GmapMarker
      class="marker-hover"
      :position="pos"
      :clickable="true"
      :draggable="false"
      :icon="markerlight"
      @mouseover="holdImg"
      @mouseout="closeImg"

      />-->
    </GmapMap>
  </div>
</template>
<script>
import reviewAvarageById from '../components/review-avarage-by-id.vue';

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
        url: mapMarker,
        size: { width: 60, height: 90, f: "px", b: "px" },
        scaledSize: { width: 40, height: 45, f: "px", b: "px" }
      },
      // markerlight: {
      //   url: lightMarker,
      //   size: { width: 60, height: 90, f: "px", b: "px" },
      //   scaledSize: { width: 40, height: 45, f: "px", b: "px" }
      // },
      url: null,
      id: null,
      proj: null,
      x: 0,
      y: 0,
      isShow: false
      // pos: {lat:34,lng: 34},
    };
  },
  created() {},

  methods: {
    openImg(m, index, $event) {
      setTimeout(() => {
        this.x = $event.tb.pageX;
        this.y = $event.tb.pageY;
        this.isShow = true;
        // this.pos = m.position
        this.url = m.url;
        this.id = m.id;
        this.proj = m.proj;
      }, 1);
    },
    holdImg() {
      this.isShow = true;
    },
    closeImg() {
      if (!this.isShow) return;
      this.isShow = false;
    },
    openDetails(id) {
      this.$router.push("/proj/" + id);
    }
  },
  mounted() {
    document.addEventListener("click", this.closeImg);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeImg);
  },
  components: {
    reviewAvarageById,
  },
};
</script>

<style>
.marker-hover {
  /* z-index: 1200; */
}
</style>



