<template>
  <div class="proj-list width-container" v-if="projs">
    <h2>Be the change, Be a global volunteer abroad</h2>
    <div class="around-the-world-list">
        <proj-preview-card
          v-for="proj in projs" 
          :key="proj._id"
          :proj="proj"
          :title="proj.description.substring(0,80) +'... Click to read more!!'"
          class="proj-preview-card"
          @click.native="openDetails(proj._id)"
        />
    </div>
  </div>
</template>

<script>
import projPreviewCard from "../components/proj-preview-card.vue";

export default {
  name: "projList",
  data() {
    return {
      projs: null
    };
  },
  async created() {
    this.projs = await this.$store.dispatch({ type: "loadProjs" });
  },
  methods: {
    openDetails(id) {
      this.$router.push("/proj/" + id);
    },
  },
  components: {
    projPreviewCard
  }
};
</script>
