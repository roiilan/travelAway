<template>
  <div v-if="favor">
<div> 
    <img :src="favor.imgUrl" v-if="favor.imgUrl" alt="favor picture"/>
</div>

  <h2 >how can you Help?</h2>
  <h3>{{favor.title}}</h3>
  <article class="description">Description: {{favor.description}} </article>

<div class="avilable-date-container">
Reqieres Dates:
</div>

   <router-link :to="'/edit/' + favor._id">
       <button>Edit</button>    
   </router-link>
   
    <favor-map/> 

 <pre>{{favor}}</pre>
 </div>
</template>

<script>
import favorMap from './favor-map.vue'


export default {
  data() {
    return {
      favor: null
    }
  },
  async created() {
     this.favor = await this.$store.dispatch({
          type: 'loadFavor',
          favorId: this.$route.params.id
      });
  },
     components: {
    favorMap,
    }
}
</script>


<style scoped>
</style>

