<template>
  <div class="container-map">
    <section v-if="object && object.username">
      <transition name="fade">
        <img
          v-if="isShow"
          :style="`top:${y}px; left:${x}px`"
          class="img-on-map-container"
          :src="object.imgUrl"
          alt
        />
      </transition>
    </section>
    <section v-else-if="object">
      <transition name="fade">
        <marker-card
          :proj="object"
          v-if="isShow"
          title="Click to view project details"
          @click.native="openDetails(proj._id)"
          class="img-on-map-container"
          :style="`top:${y}px; left:${x}px`"
        />
      </transition>
    </section>
    <GmapMap
      class="map"
      :center="{
        lat: 33.886917,
        lng: 9.537499}"
      :zoom="1.5"
      map-type-id="terrain"
    >
      <!-- <GmapMap class="map" v-if="position" :center="position" :zoom="zoomSize" map-type-id="terrain"> -->
      <GmapMarker
        :key="index"
        v-for="(m, index) in array"
        :ref="`marker${index}`"
        :position="{lat:m.position.lat,lng:m.position.lng}"
        :clickable="true"
        :draggable="false"
        :icon="markerOptions"
        @click="openImg(m, index, $event)"
      />
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :ref="`marker${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="markerOptions"
        @click="openImg(m, index, $event)"
      />-->
    </GmapMap>
  </div>
</template>
<script>
import markerCard from "./marker-card.vue";

const mapMarker = require("../assets/png/airport.png");

export default {
  props: {
    array: Array
  },
  // props: {
  //   position: null,
  //   markers: Array,
  //   zoomSize: null
  // },
  data() {
    return {
      markerOptions: {
        url: mapMarker,
        size: { width: 60, height: 90, f: "px", b: "px" },
        scaledSize: { width: 40, height: 45, f: "px", b: "px" }
      },
      object: null,
      x: 0,
      y: 0,
      isShow: false
    };
  },
  created() {},

  methods: {
    openImg(m, index, $event) {
      setTimeout(() => {
        this.x = $event.tb.screenX || $event.rb.screenX;
        this.y = $event.tb.screenY || $event.rb.screenY;
        this.isShow = true;
        console.log(m, 'm');
        
        this.object = m;
        // this.proj = m.proj;
      }, 1);
    },
    holdImg() {
      this.isShow = true;
    },
    handlePress(event) {
      if (event.keyCode === 27 || event.keyCode === 32) {
        this.closeImg();
      }
      if (event.keyCode === 13) {
        this.openDetails(this.proj._id);
      }
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
    document.addEventListener("keydown", this.handlePress);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeImg);
    document.removeEventListener("keydown", this.handlePress);
  },
  components: {
    markerCard
  }
};
</script>
