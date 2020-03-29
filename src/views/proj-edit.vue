<template>
  <div class="proj-edit width-container" v-if="proj">
    <h1><span v-if="proj._id">{{proj.title}}</span> <span v-else>Add a WalkAway project</span> </h1>
    
    <form class="form-proj-edit" @submit.prevent="save(proj)">
      <div>
        <h3>Organization name</h3>
        <el-input placeholder="Organization name?" v-model="proj.organization">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>

        <h3>Project name</h3>
        <el-input placeholder="Project name?" v-model="proj.title">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>

        <h3>Category selection</h3>
        <el-select
          required
          v-model="proj.category"
          filterable
          default-first-option
          placeholder="Category"
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <h3>Description about project</h3>
        <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="Write a few words about your project :)"
          v-model="proj.description"
        ></el-input>

        <h3>Choose a date</h3>
        <el-date-picker
          v-model="proj.date"
          type="daterange"
          unlink-panels
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        ></el-date-picker>
      </div>

      <div>
        <h2>Requirements</h2>
        <h3>Members Needed</h3>
        <el-input-number v-model="proj.membersNeeded" :min="1" :max="100"></el-input-number>

        <h3>Minimum Age: {{proj.requirements.minAge}}</h3>
        <el-input-number v-model="proj.requirements.minAge" :min="14"></el-input-number>

        <h3>Language skill</h3>
        <el-select
          v-model="proj.requirements.languages"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Choose language"
        >
          <el-option
            v-for="item in languages"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <h3>More skills</h3>
        <el-select
          v-model="proj.requirements.otherSkills"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Add Skills"
        >
          <el-option
            v-for="item in otherSkills"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <h2>What's included</h2>
        <el-select
          v-model="proj.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="What's included"
        >
          <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>

      <div>
        <h3>Please enter an address</h3>
        <el-input
          placeholder="Please enter an address"
          v-model="proj.position.txtAddress"
          @blur.prevent="searchPosition(proj.position.txtAddress)"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            @click.prevent="searchPosition(proj.position.txtAddress)"
          ></i>
        </el-input>
        <proj-map class="map" :zoomSize="zoomSize" :markers="markers" :position="proj.position"></proj-map>
      </div>

      <div class="upload-img-container">
        <h3>Upload Imgaes</h3>
        <label v-if="proj.imgUrls.length === 0" class="upload-img" title="Upload Image">
          <input @input="uploadImg" type="file" hidden />
          <img class="plus-icon" src="../assets/icon/plus.png" />
        </label>
        <label v-else class="upload-add-img" title="Upload Image">
          <input @input="uploadImg" type="file" hidden />
          <span class="btn-span">Upload more Images</span>
        </label>
        <el-carousel v-if="proj.imgUrls.length" class="fit">
          <el-carousel-item
            v-for="(url, index) in proj.imgUrls"
            :key="url"
            class="img-proj-container"
          >
            <img :src="url" @click="setCurrImg(index)" class="img-proj" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="btn-save-delete-container flex a-center">
        <span class="btn-span" v-if="proj._id" @click="remove(proj._id)">Delete</span>
        <span class="btn-span" v-else @click="reset">Reset</span>
        <button class="btn-save">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import { projService } from "../services/proj.service.js";
import toggleBtn from "@/components/toggle-btn.vue";
import projMap from "../components/proj-map.vue";
import { eventBus } from "../services/eventbus-service.js";

export default {
  data() {
    return {
      value1: "",
      proj: null,
      currentImgIdx: null,
      markers: [],
      zoomSize: 2,
      loggedinUser: null,
      categories: [
        {
          value: "childcare",
          label: "Childcare"
        },
        {
          value: "animalsAndWildlife",
          label: "Animals & Wildlife"
        },
        {
          value: "environmentalProtection",
          label: "Environmental Protection"
        },
        {
          value: "farming",
          label: "Farming"
        },
        {
          value: "scubaDiving",
          label: "Scuba Diving"
        },
        {
          value: "humanitarian",
          label: "Humanitarian"
        },
        {
          value: "healthcare",
          label: "Healthcare"
        },
        {
          value: "sports",
          label: "Sports"
        },
        {
          value: "education",
          label: "Education"
        },
        {
          value: "art",
          label: "culture & Arts"
        },
        {
          value: "humanRights",
          label: "Human Rights"
        }
      ],
      languages: [
        {
          value: "Hebrew",
          label: "Hebrew"
        },
        {
          value: "English",
          label: "English"
        },
        {
          value: "Spanish",
          label: "Spanish"
        }
      ],
      otherSkills: [
        {
          value: "Driving",
          label: "Driving"
        },
        {
          value: "Health",
          label: "Health"
        },
        {
          value: "Education",
          label: "Education"
        },
        {
          value: "Organizer",
          label: "Organizer"
        }
      ],
      tags: [
        {
          value: "Airport Taxi",
          label: "Airport Taxi"
        },
        {
          value: "Housing",
          label: "Housing"
        },
        {
          value: "Single Bad",
          label: "Single Bad"
        },
        {
          value: "Duble Bad",
          label: "Duble Bad"
        },
        {
          value: "Food",
          label: "Food"
        },
        {
          value: "Wifi",
          label: "Wifi"
        },
        {
          value: "HotWater",
          label: "HotWater"
        }
      ]
    };
  },
  async created() {
    this.loggedinUser = await this.$store.getters.loggedinUser;
    const projId = this.$route.params.id;
    if (projId) {
      var proj = await this.$store.dispatch({
        type: "loadProj",
        projId
      });
      this.proj = JSON.parse(JSON.stringify(proj));
      if (
        this.loggedinUser._id !== this.proj.createdBy._id &&
        !this.loggedinUser.isAdmin
      ) {
        this.$router.push("/");
      }
    } else {
      if (!this.loggedinUser) {
        this.$store.commit({
          type: "setMsg",
          msg: { isShow: true, txt: "You must register first" }
        });
        this.$router.push("/login");
      }
      this.proj = projService.getEmptyProj();
      // this.proj.imgUrls.push(this.loggedinUser.imgUrl);
    }
  },
  methods: {
    async uploadImg(ev) {
      var img = await this.$store.dispatch({
        type: "addImg",
        imgEv: ev
      });
      this.currentImgIdx || this.currentImgIdx === 0
        ? this.proj.imgUrls.splice(this.currentImgIdx, 1, img.url)
        : this.proj.imgUrls.push(img.url);
      this.currentImgIdx = null;
    },
    async save(proj) {
      if (!proj.category) {
        this.$store.commit({
          type: "setMsg",
          msg: { isShow: true, txt: "You must select a category" }
        });
        window.scrollTo(0,0)
        return
      } 
      // proj.date = this.fixDate(proj.date);
      var res = await this.$store.dispatch({ type: "saveProj", proj });
      this.$router.push("/");
    },
    fixDate(dates) {
      console.log('dates:', dates);
      var dates = dates.map(date => date.substring(0, 10).split('-').join('/'));
      console.log('dates:', dates);
      return dates;
    },
    async remove(projId) {
      var res = await this.$store.dispatch({ type: "removeProj", projId });
      this.$router.push("/");
    },

    async setCurrImg(idx) {
      this.currentImgIdx = idx;
    },
    async searchPosition(txt) {
      //  var txt =proj.position.txtAddress
      console.log(txt, "txt");
      var currPosition = await this.$store.dispatch({
        type: "searchPosition",
        txt
      });
      if (currPosition) {
        this.proj.position = currPosition;

        this.zoomSize = 14;
        this.markers = [
          { position: { lat: currPosition.lat, lng: currPosition.lng } }
        ];
      }
    },
    reset() {
      this.proj = projService.getEmptyProj();
      window.scrollTo(0, 0);
    }
  },
  components: {
    toggleBtn,
    projMap,
    DateRangePicker
  }
};
</script>

