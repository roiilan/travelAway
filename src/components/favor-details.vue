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
     var favor = await this.$store.dispatch({
          type: 'loadFavor',
          favorId: this.$route.params.id
      });
      this.favor = favor;
  }
}
</script>


<style scoped>
</style>

