<template>
    <div class="favor-edit" v-if="favor">
        <form @submit.prevent="save(favor)">
            <h2 v-if="favor._id">{{favor.requestedBy.fullName}}</h2>
            <img v-if="favor._id" :src="favor.requestedBy.imgUrl"/>
            <input type="text" v-model="favor.title">
            <textarea v-model="favor.description" cols="30" rows="10"></textarea>
            <input type="date" v-model="favor.startAt.date">
            <input type="time" v-model="favor.startAt.time">
            <input type="date" v-model="favor.endsAt.date">
            <input type="time" v-model="favor.endsAt.time">
            <input type="text" v-model="favor.address" @blur="getLatLong" placeholder="Please enter an address.." required>
             <toggle-btn v-model="favor.isAboard" @click.native="emitAboard"></toggle-btn>

            <!-- <input type="file" ref="upLoadImg" @change="upLoadImg" hidden> -->
            <label class="favor-edit-upload-img"> 
                <input @input="uploadImg" type="file" hidden>
                <img src="https://image.flaticon.com/icons/svg/1837/1837526.svg">
                <p class="favor-edit-upload-txt">Upload! </p>
            </label>
                <div v-for="(url, index) in favor.imgUrls" class = "uploaded-img" >
                   <label> 
                  <img :src="url" @click="setCurrImg(index)" >
                 <input @input="uploadImg" type="file" hidden>
                 </label>
                </div>
            <button>Save</button>       
        </form>
        <button v-if="favor._id" @click="remove(favor._id)">Delete</button>
        <pre>{{favor}}</pre>
    </div>
</template>

<script>
import { favorService } from "../services/favor.service.js";
import toggleBtn from "@/components/toggle-btn.vue";

export default {
  data() {
    return {
      favor: null,
      currentImgIdx:null
    };
  },
  async created() {
    const favorId = this.$route.params.id;
    if (favorId) {
      var favor = await this.$store.dispatch({
        type: "loadFavor",
        favorId
      });
      this.favor = JSON.parse(JSON.stringify(favor));
    } else {
      this.favor = favorService.getEmptyFavor();
    }
  },
  methods: {
    async uploadImg(ev) {
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      (this.currentImgIdx || this.currentImgIdx === 0 )?  this.favor.imgUrls.splice(this.currentImgIdx, 1, img.url) : this.favor.imgUrls.push(img.url)
      this.currentImgIdx = null
    },
    async save(favor) {
      var res = await this.$store.dispatch({ type: "saveFavor", favor });
      this.$router.push("/");
    },
    async remove(favorId) {
      var res = await this.$store.dispatch({ type: "removeFavor", favorId });
      this.$router.push("/");
    },
     emitAboard() {
      this.$emit("set-filter", JSON.parse(JSON.stringify(this.favor)));
    },
     async setCurrImg(idx){
       console.log(idx);
       
      this.currentImgIdx = idx
    },


},
        components: {
      toggleBtn
    },
}
</script>


<style scoped>
img {
  width: 50%;
}

.favor-edit-upload-img {
  position: relative;
  height: 200px;
  width: 257px;
  transition: opacity 0.2s, visibility 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.favor-edit-upload-img:hover {
  opacity: 0.8;
}

.favor-edit-upload-txt {
  position: absolute;
  font-size: 1.5em;
  background: rgba(241, 241, 241, 0.72);
  color: rgb(26, 26, 26);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}

.favor-edit-upload-img:hover .favor-edit-upload-txt {
  visibility: visible;
  opacity: 1;
}

.uploaded-img{
  width: 25%;
  display:inline-block

}
</style>