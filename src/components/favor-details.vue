<template>
  <div v-if="favor">
 <pre>{{favor}}</pre>
    <router-link :to="'/edit/' + favor._id">Edit</router-link>

</div>
</template>

<script>
import favorPreview from './favor-preview.vue'


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
  }
}
</script>


<style scoped>
</style>

