<template>
  <div class="favor-edit" v-if="favor">
    <form @submit.prevent="save(favor)">
      <h2 v-if="favor._id">{{favor.requestedBy}}</h2>
      <input type="text" v-model="favor.title" />
      <textarea v-model="favor.description" cols="30" rows="10"></textarea>
      <input type="date" v-model="favor.startAt.date" />
      <input type="time" v-model="favor.startAt.time" />
      <input type="date" v-model="favor.endsAt.date" />
      <input type="time" v-model="favor.endsAt.time" />
      <toggle-btn v-model="favor.isAboard" @click.native="emitAboard"></toggle-btn>
      <label class="favor-edit-upload-img">
        <input @change="uploadImg" type="file" hidden multiple />
        <img :src="favor.imgUrl" />
        <p class="favor-edit-upload-txt">Upload yout own!</p>
      </label>
      <!-- <label class="favor-edit-upload-img" v-if="favor.isAboard" >
        <input @change="uploadImg" type="file" hidden />
        <img :src="favor.imgUrl" />
        <p class="favor-edit-upload-txt">Upload yout own!</p>
      </label> -->
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
      favor: null
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
        console.log(this.favor.img);
        
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      this.favor.imgUrl=[img.url];
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
    }

  },
    components: {
    toggleBtn
  },
};
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
</style>