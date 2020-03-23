<template>
    <div class="proj-edit" v-if="proj">
        <form @submit.prevent="save(proj)">
            <h2 v-if="proj._id">{{proj.requestedBy.fullName}}</h2>
            <img v-if="proj._id" :src="proj.requestedBy.imgUrl"/>
            <input type="text" v-model="proj.title">
            <textarea v-model="proj.description" cols="30" rows="10"></textarea>
            <input type="date" v-model="proj.startAt.date">
            <input type="time" v-model="proj.startAt.time">
            <input type="date" v-model="proj.endsAt.date">
            <input type="time" v-model="proj.endsAt.time">
             <toggle-btn v-model="proj.isAboard" @click.native="emitAboard"></toggle-btn>

            <!-- <input type="file" ref="upLoadImg" @change="upLoadImg" hidden> -->
                <label class="proj-edit-upload-img"> 
                    <input @input="uploadImg" type="file" hidden>
                    <img src="https://image.flaticon.com/icons/svg/1837/1837526.svg">
                    <p class="proj-edit-upload-txt">Upload! </p>
                </label>
                
                <div v-for="(url, index) in proj.imgUrls" class = "uploaded-img" >
                  <label> 
                    <img :src="url" @click="setCurrImg(index)" >
                    <input @input="uploadImg" type="file" hidden>
                  </label>
                </div>         

                 <div>
                   What is the proj address?
                   <input class="text-location" type="text" placeholder="Address"
                    v-model="proj.position.txtAddress"
                    @change="searchPosition(proj.position.txtAddress)"
                    >
                  <proj-map :position="proj.position"> </proj-map>
                 </div>


            <button>Save</button>       
        </form>
        <button v-if="proj._id" @click="remove(proj._id)">Delete</button>
        <pre>{{proj}}</pre>
    </div>
</template>

<script>
import { projService } from "../services/proj.service.js";
import toggleBtn from "@/components/toggle-btn.vue";
import projMap from '../components/proj-map.vue';


export default {
  data() {
    return {
      proj: null,
      currentImgIdx:null
    };
  },
  async created() {
    const projId = this.$route.params.id;
    if (projId) {
      var proj = await this.$store.dispatch({
        type: "loadProj",
        projId
      });
      this.proj = JSON.parse(JSON.stringify(proj));
    } else {
      this.proj = projService.getEmptyProj();
    }
  },
  methods: {
    async uploadImg(ev) {
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      (this.currentImgIdx || this.currentImgIdx === 0 )?  this.proj.imgUrls.splice(this.currentImgIdx, 1, img.url) : this.proj.imgUrls.push(img.url)
      this.currentImgIdx = null
    },
    async save(proj) {
      var res = await this.$store.dispatch({ type: "saveProj", proj });
      this.$router.push("/");
    },
    async remove(projId) {
      var res = await this.$store.dispatch({ type: "removeProj", projId });
      this.$router.push("/");
    },
    async getLatLong(){
      this.proj.position = await this.$store.dispatch({type:'getLatLong', txt: this.proj.address})
    },
     emitAboard() {
      this.$emit("set-filter", JSON.parse(JSON.stringify(this.proj)));
    },
     async setCurrImg(idx){
       console.log(idx);
       
      this.currentImgIdx = idx
    },
       async searchPosition(txt) {
         console.log(txt,"txt")
         var currPosition = await this.$store.dispatch({ type: "searchPosition", txt });
         console.log("second projEdit")
         console.log(currPosition,"second projEdit")
        }


},
        components: {
      toggleBtn,
      projMap
    },
}
</script>


<style scoped>
img {
  width: 50%;
}

.proj-edit-upload-img {
  position: relative;
  height: 200px;
  width: 257px;
  transition: opacity 0.2s, visibility 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.proj-edit-upload-img:hover {
  opacity: 0.8;
}

.proj-edit-upload-txt {
  position: absolute;
  font-size: 1.5em;
  background: rgba(241, 241, 241, 0.72);
  color: rgb(26, 26, 26);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}

.proj-edit-upload-img:hover .proj-edit-upload-txt {
  visibility: visible;
  opacity: 1;
}

.uploaded-img{
  width: 25%;
  display:inline-block

}
</style>