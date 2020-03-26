<template>
  <div class="proj-edit width-container" v-if="proj">
    <form class="form-proj-edit flex col" @submit.prevent="save(proj)">
      <div class="flex around">
        <div class="flex col">
          <label class="proj-edit-upload-img">
            <input @input="uploadImg" type="file" hidden />
            <img src="https://image.flaticon.com/icons/svg/1837/1837526.svg" />
            <p class="proj-edit-upload-txt">Upload!</p>
          </label>

          <div
            v-for="(url, index) in proj.imgUrls"
            :key="url"
            class="img-proj-container ratio-16-9"
          >
            <label>
              <img :src="url" @click="setCurrImg(index)" class="img-proj" />
              <input @input="uploadImg" type="file" hidden />
            </label>
          </div>
          <!-- <img v-if="proj._id"
              class="img-user"
              :title="proj.createdBy.fullName" 
          :src="proj.createdBy.imgUrl"/>-->
          <input type="text" v-model="proj.title" />
          <textarea v-model="proj.description" cols="30" rows="10"></textarea>
          <input type="date" v-model="proj.startAt.date" />
          <input type="time" v-model="proj.startAt.time" />
          <input type="date" v-model="proj.endsAt.date" />
          <input type="time" v-model="proj.endsAt.time" />
          <!-- <date-range-picker
                ref="picker"
                :opens="opens"
                :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
                :minDate="minDate" :maxDate="maxDate"
                :singleDatePicker="singleDatePicker"
                :timePicker="timePicker"
                :timePicker24Hour="timePicker24Hour"
                :showWeekNumbers="showWeekNumbers"
                :showDropdowns="showDropdowns"
                :autoApply="autoApply"
                v-model="dateRange"
                @update="updateValues"
                @toggle="checkOpen"
                :linkedCalendars="linkedCalendars"
                :dateFormat="dateFormat">
                <template v-slot:input="picker" style="min-width: 350px;">
                    {{ picker.startDate | date }} - {{ picker.endDate | date }}
                </template>
          </date-range-picker>-->
          <!-- <toggle-btn v-model="proj.isAboard" @click.native="emitAboard"></toggle-btn> -->
          <el-select
            v-model="proj.category"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Choose language"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
         
        </div>

        <div class="tags-container">
          <h2>Requirements</h2>
          <h3>Age range (in years): Min: {{proj.requirements.age[0]}}, Max: {{proj.requirements.age[1]}}.</h3>
          <el-slider v-model="proj.requirements.age" range show-input :max="120" :min="0"></el-slider>
          <h3>Volunteering range (in days): Min: {{proj.requirements.day[0]}}, Max: {{proj.requirements.day[1]}}.</h3>
          <el-slider v-model="proj.requirements.day" range show-input :max="1000" :min="0"></el-slider>
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

          <el-cascader
            v-model="proj.tags"
            :options="tags"
            clearable
            
            placeholder="What's included"
            :props="{ multiple: true, checkStrictly: true }"
            collapse-tags
            filterable
          ></el-cascader>
        </div>
      </div>
      <div>
        <input
          class="text-location"
          type="text"
          placeholder="Address"
          v-model="proj.position.txtAddress"
          @change="searchPosition(proj.position.txtAddress)"
        />
        <proj-map class="map" :zoomSize="zoomSize" :markers="markers" :position="proj.position"></proj-map>
      </div>
      <span v-if="proj._id" @click="remove(proj._id)">Delete</span>
      <button>Save</button>
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
      proj: null,
      currentImgIdx: null,
      markers: [],
      zoomSize: 2,
      loggedinUser: null,
      categories:[
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
        },
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
          value: "Housing",
          label: "Housing",
          children: [
            {
              value: "GuestFamily",
              label: "GuestFamily"
            },
            {
              value: "SingleBad",
              label: "SingleBad"
            },
            {
              value: "DubleBad",
              label: "DubleBad"
            }
          ]
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
      var res = await this.$store.dispatch({ type: "saveProj", proj });
      this.$router.push("/");
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
    }
  },
  components: {
    toggleBtn,
    projMap,
    DateRangePicker
  }
};
</script>

