<template>
  <div class="proj-details-container width-container" v-if="proj">

      <div class="proj-details" >
         
          <!-- <router-link :to="'/user/' + proj.createdBy._id">
          <img class="img-user" 
          :src="proj.createdBy.imgUrl" 
          :alt="proj.createdBy.fullName"
          :title="proj.createdBy.fullName"/>
          </router-link> -->
          <router-link 
          v-if="loggedinUser && (loggedinUser._id === proj.createdBy._id || loggedinUser.isAdmin)"
          :to="'/edit/' + proj._id"
          >
          EDIT
          </router-link>
          <div class="img-proj-container ratio-16-9">
          <img class="img-proj" 
          :src="proj.imgUrls[0]" 
          alt="proj picture"/>
          <!-- <h2 >how can you Help?</h2> -->
          <input v-if="isEdit" class="title-proj" v-model="proj.title"/>
          <div v-else class="title-proj">{{proj.title}}</div>
          </div>

          <div class="main-content-details">
              <article class="card-deatails description">Description: {{proj.description}} </article>
              <div class="card-deatails">Reqieres Dates:</div>
              <div class="card-deatails map-container">
              <proj-map class="map" :zoomSize="zoomSize"
              :markers="[{ position: { lat: proj.position.lat, lng: proj.position.lng } }]" 
                    :position="proj.position"> </proj-map>
              
              </div>
          </div>
    </div>
          <div @click.stop="stop">
            <proj-apply class="proj-apply" :class="{'apply-opened':isApplyOpen}"></proj-apply>
          </div>
          <div @click.stop="isApplyOpen = true" class="proj-apply-for-mobile" :class="{'apply-opened':isApplyOpen}">
            Apply now
          </div>
  </div>
</template>

<script>
import projMap from './proj-map.vue';
import projApply from './proj-apply.cmp.vue';

export default {
  data() {
    return {
      proj: null,
      isApplyOpen: false,
      isEdit: false,
      zoomSize: 14
    }
  },
  async created() {
     this.proj = await this.$store.dispatch({
          type: 'loadProj',
          projId: this.$route.params.id
      });
    },
    components: {
     projMap,
     projApply
    },
    computed: {
      loggedinUser(){
        return this.$store.getters.loggedinUser;
      }
    },
    methods: {
      openApply() {
        this.isApplyOpen = false;
      },
      stop (){
        
      }
    },
    mounted() {
      document.addEventListener('click', this.openApply);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.openApply);
    },
}
</script>
