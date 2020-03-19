<template>
  <div v-if="favor">
 <pre>{{favor}}</pre>
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
<<<<<<< HEAD
      this.favor = favor;
=======
>>>>>>> bf2c93ac0f879793be3004ca26b633e603ae4719
  }
}
</script>


<style scoped>
</style>

