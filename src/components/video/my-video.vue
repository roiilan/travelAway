<template>
  <section class="my-video">
    <div></div>
    <div class="container-canvas-video">
      <img v-if="profile" width="240" height="180" :src="profile" alt />
      <video v-else ref="video" width="240" height="180" autoplay></video>
      <canvas ref="canvas" width="640" height="480"></canvas>
    </div>
    <div v-if="profile">
      <button @click="play">Try again</button>
      <!-- <a :href="profile" download="my-file-name.png"> -->
        <button @click="uploadImg">Aprrove</button>
      <!-- </a> -->
    </div>
    <button v-else @click="capture">Take my photo</button>
  </section>
</template>

<script>
export default {
  name: "my-video",
  data() {
    return {
      video: {},
      canvas: {},
      profile: null
    };
  },
  mounted() {
    this.video = this.$refs.video;
    this.play();
  },
  beforeDestroy(){
    this.stop()
  },
  methods: {
    stop() {
      this.video.srcObject.getTracks().forEach(track => track.stop());
    },
    play() {
      this.profile = null;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.video.srcObject = stream;
          this.video.play();
        });
      }
    },
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.profile = this.canvas.toDataURL("image/png");
      this.stop();
    },
    async uploadImg() {
      const img = await this.$store.dispatch({
        type: "addImg",
        imgEv: this.profile
      });
      console.log(img.url, 'img.url');
      
      this.$emit('input', img.url);
    }
  }
};
</script>
