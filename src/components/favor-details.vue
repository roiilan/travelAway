<template>
  <div v-if="proj">
 {{proj}}
  </div>
</template>

<script>
import favorPreview from './favor-preview.vue'


export default {
  computed: {
      proj() {
          return this.$store.getters.proj;
      }
  },
  created() {
      this.$store.dispatch({
          type: 'getProj',
          projId: this.$route.params.id
      });
  }
}
</script>


<style scoped>
</style>

