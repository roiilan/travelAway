<template>
    <div class="proj-edit" v-if="proj">
        <form class="form-proj-edit flex col" @submit.prevent="save(proj)">
          <div class="flex around">
            <div class="flex col">
              <h2>Upload images</h2>
              <label class="proj-edit-upload-img"> 
                  <input @input="uploadImg" type="file" hidden>
                  <img src="https://image.flaticon.com/icons/svg/1837/1837526.svg">
                  <p class="proj-edit-upload-txt">Upload! </p>
              </label>
              
            <div v-for="(url, index) in proj.imgUrls" :key="url" class="img-proj-container ratio-16-9">
                <label > 
                  <img :src="url" @click="setCurrImg(index)" class="img-proj">
                  <input @input="uploadImg" type="file" hidden>
                </label>
            </div>         
              <!-- <img v-if="proj._id"
              class="img-user"
              :title="proj.createdBy.fullName" 
              :src="proj.createdBy.imgUrl"/> -->
              <h2>Title</h2>
              <input type="text" v-model="proj.title">
              <h2>Description</h2>
              <textarea v-model="proj.description" cols="30" rows="10"></textarea>
              <h2>Start At</h2>
              <input type="date" v-model="proj.startAt.date">
              <input type="time" v-model="proj.startAt.time">
              <h2>Ends At</h2>
              <input type="date" v-model="proj.endsAt.date">
              <input type="time" v-model="proj.endsAt.time">
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
              </date-range-picker> -->
              <h2>Category</h2>
              <select v-model="proj.category" required>
                <option value="childcare">Childcare</option>
                <option value="animalsAndWildlife">Animals & Wildlife</option>
                <option value="environmentalProtection">Environmental Protection</option>
                <option value="farming">Farming</option>
                <option value="scubaDiving">Scuba Diving</option>
                <option value="humanitarian">Humanitarian</option>
                <option value="healthcare">Healthcare</option>
                <option value="sports">Sports</option>
                <option value="education">Education</option>
                <option value="art">culture & Arts</option>
                <option value="humanRights">Human Rights</option>
              </select>
    
                  <div class="tags-container">
                    <h2>Requirements</h2>
                    <div>
                      <div class="tag-card">
                        <toggle-btn v-model="proj.requirements.age.isOn"></toggle-btn>
                        <h4 :class="{'is-on': !proj.requirements.age.isOn}">Age</h4>
                      </div>

                      <div v-if="proj.requirements.age.isOn">
                        <input type="range" v-model.number="proj.requirements.age.data.min">
                        <pre>{{proj.requirements.age.data.min}}</pre>
                        <input type="range" v-model.number="proj.requirements.age.data.max">
                        <pre>{{proj.requirements.age.data.max}}</pre>
                      </div>
                    </div>
                    <div>
                       <div class="tag-card">
                        <toggle-btn v-model="proj.requirements.date.isOn"></toggle-btn>
                        <h4 :class="{'is-on': !proj.requirements.date.isOn}">Date</h4>
                      </div>
                      <div v-if="proj.requirements.date.isOn">
                        <input type="range" v-model.number="proj.requirements.date.data.min">
                        <pre>{{proj.requirements.date.data.min}}</pre>
                        <input type="range" v-model.number="proj.requirements.date.data.max">
                        <pre>{{proj.requirements.date.data.max}}</pre>
                      </div>
                    </div>
                    <div>
                        <div class="tag-card">
                        <toggle-btn v-model="proj.requirements.language.isOn"></toggle-btn>
                        <h4 :class="{'is-on': !proj.requirements.language.isOn}">Language</h4>
                      </div>
                      <div v-if="proj.requirements.language.isOn">
                          <div class="tag-card">
                            <toggle-btn v-model="proj.requirements.language.data.he"></toggle-btn>
                            <h4 :class="{'is-on': !proj.requirements.language.data.he}">Hebrew</h4>
                          </div>
                          <div class="tag-card">
                            <toggle-btn v-model="proj.requirements.language.data.en"></toggle-btn>
                            <h4 :class="{'is-on': !proj.requirements.language.data.en}">English</h4>
                          </div>
                          <div class="tag-card">
                            <toggle-btn v-model="proj.requirements.language.data.es"></toggle-btn>
                            <h4 :class="{'is-on': !proj.requirements.language.data.es}">Spanish</h4>
                          </div>
                      </div>
                    </div>
                    <!-- <div>
                      <input type="checkbox" v-model="proj.requirements.otherSkills.isOn">
                      <div v-if="proj.requirements.otherSkills.isOn">
                        <input type="text" placeholder="" v-model="skill">
                        <input type="text" v-model.number="proj.requirements.otherSkills.skills.skill">
                        <pre>{{proj.requirements.language.language.he}}</pre>
                      </div>
                    </div> -->
                    <div class="tag-card">
                        <toggle-btn v-model="proj.requirements.criminalBackgroundCheck"></toggle-btn>
                        <h4 :class="{'is-on': !proj.requirements.criminalBackgroundCheck}">Check Criminal Background</h4>
                    </div>
                    <div class="tag-card">
                        <toggle-btn v-model="proj.requirements.education"></toggle-btn>
                        <h4 :class="{'is-on': !proj.requirements.education}">Education</h4>
                    </div>
                  </div>
                 
                  <div class="tags-container">
                    <h2>What's incloudes</h2>
                    <div class="tag-card">
                      <toggle-btn v-model="proj.tags.airportTaxi"></toggle-btn>
                      <h4  :class="{'is-on': !proj.tags.airportTaxi}">AirportTaxi</h4>
                    </div>
                    <div class="housing">
                      <h3>Housing</h3>
                        <div class="tag-card">
                          <toggle-btn v-model="proj.tags.housing.guestFamily"></toggle-btn>
                          <h4  :class="{'is-on': !proj.tags.housing.guestFamily}">GuestFamily</h4>
                        </div>
                        <div class="tag-card">
                          <toggle-btn v-model="proj.tags.housing.singleBad"></toggle-btn>
                          <h4  :class="{'is-on': !proj.tags.housing.singleBad}">SingleBad</h4>
                        </div>
                        <div class="tag-card">
                          <toggle-btn v-model="proj.tags.housing.dubleBad"></toggle-btn>
                          <h4  :class="{'is-on': !proj.tags.housing.dubleBad}">DubleBad</h4>
                        </div>
                    </div>
                    <div class="tag-card">
                      <toggle-btn v-model="proj.tags.food"></toggle-btn>
                      <h4  :class="{'is-on': !proj.tags.food}">Food</h4>
                    </div>
                    <div class="tag-card">
                      <toggle-btn v-model="proj.tags.wifi"></toggle-btn>
                      <h4  :class="{'is-on': !proj.tags.wifi}">Wifi</h4>
                    </div>
                    <div class="tag-card">
                      <toggle-btn v-model="proj.tags.hotWater"></toggle-btn>
                      <h4  :class="{'is-true': !proj.tags.hotWater}">HotWater</h4>
                    </div> -->
                  </div>
                  <!-- <pre>   
                  {{proj}}
                  </pre>
  <el-select
    v-model="value"
    multiple
    allow-create
    default-first-option
    placeholder="Facilities">
    <el-option
      v-for="item in proj.tags"
      :key="item"
      :label="item"
      :value="item.value">
    </el-option>
  </el-select> -->



              

                      <h4  :class="{'is-on': !proj.tags.hotWater}">HotWater</h4>
                    </div>
                  </div>         
          </div>
          <div>
            What is the project address?
            <input class="text-location" type="text" placeholder="Address"
            v-model="proj.position.txtAddress"
            @change="searchPosition(proj.position.txtAddress)"
            >
            <proj-map :zoomSize="zoomSize" :markers="markers" 
            :position="proj.position"> </proj-map>
            </div>
          </div>
          <span v-if="proj._id" @click="remove(proj._id)">Delete</span>
          <button>Save</button>       
        </form>
        <!-- <pre>{{proj}}</pre> -->
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { projService } from "../services/proj.service.js";
import toggleBtn from "@/components/toggle-btn.vue";
import projMap from '../components/proj-map.vue';
import {eventBus} from '../services/eventbus-service.js';

export default {
  data() {
    return {
      proj: null,
      currentImgIdx:null,
      markers: [],
      zoomSize: 2,
      loggedinUser: null,
<<<<<<< HEAD
    //  options: [{
    //       value: 'ds',
    //       label: 'Food',
    //     }, {
    //       value: 'CSS',
    //       label: 'CSS'
    //     }, {
    //       value: 'JavaScript',
    //       label: 'JavaScript'
    //     }],
    //     value: []
=======
      skill: '',
>>>>>>> fcc291f176054dc1c826315b817855d1d4ce85c9
    };
  },
  async created() {
    this.loggedinUser = await this.$store.getters.loggedinUser
    const projId = this.$route.params.id;
    if (projId) {
      var proj = await this.$store.dispatch({
        type: "loadProj",
        projId
      });
      this.proj = JSON.parse(JSON.stringify(proj));
      if (this.loggedinUser._id !== this.proj.createdBy._id && !this.loggedinUser.isAdmin) {
        this.$router.push('/')
      }
    } else {
       if (!this.loggedinUser) {
          this.$store.commit({type:'setMsg', msg: {isShow: true, txt:'You must register first'} })
        this.$router.push('/login')
        // eventBus.$emit('showMsg', 'You must register first')
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
     emitAboard() {
      this.$emit("set-filter", JSON.parse(JSON.stringify(this.proj)));
    },
     async setCurrImg(idx){
         this.currentImgIdx = idx
    },
       async searchPosition(txt) {
        //  var txt =proj.position.txtAddress
         console.log(txt,"txt");
         var currPosition = await this.$store.dispatch({ type: "searchPosition", txt });
         if(currPosition){
         this.proj.position=currPosition;
           this.zoomSize=14;
           this.markers=[{ position: { lat: currPosition.lat, lng: currPosition.lng } }]
         }     
        }
},
// computed: {
//       loggedinUser(){
//         return this.$store.getters.loggedinUser;
//       }
//     },
        components: {
      toggleBtn,
      projMap,
      DateRangePicker
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

