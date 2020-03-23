<template>
  <div v-if="proj">
    <router-link :to="'/user/' + proj.requestedBy._id">
      User Profile
    </router-link>
<div> 
    <img :src="proj.imgUrls[0]" v-if="proj.imgUrls" alt="proj picture"/>
</div>

  <h2 >how can you Help?</h2>
  <h3>{{proj.title}}</h3>
  <article class="description">Description: {{proj.description}} </article>

<div class="avilable-date-container">
Reqieres Dates:
</div>

   <router-link :to="'/edit/' + proj._id">
       <button>Edit</button>    
   </router-link>
   
<proj-map :position="proj.position"> </proj-map>

 <pre>{{proj}}</pre>
 </div>
</template>

<script>
import projMap from './proj-map.vue'


export default {
  data() {
    return {
      proj: null
    }
  },
  async created() {
     this.proj = await this.$store.dispatch({
          type: 'loadProj',
          projId: this.$route.params.id
      });
  },
     components: {
    projMap
    }
}
</script>


<style scoped>
</style>

