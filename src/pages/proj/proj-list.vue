<template>
  <transition name="fade">
    <div class="proj-list width-container" v-if="projs">
      <filter-By class="filter-in-proj-list" />
      <h2>Be the change, Be a global volunteer abroad</h2>
      <div class="around-the-world-list">
        <marker-card
          v-for="proj in projs"
          :key="proj._id"
          :proj="proj"
          :title="proj.description.substring(0,80) +'... Click to read more!!'"
          class="proj-preview-card"
          @click.native="openDetails(proj._id)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import markerCard from "../../components/marker-card.vue";
import { eventBus } from "../../services/eventbus-service.js";

export default {
  name: "projList",

  computed: {
    projs: {
      get() {
        return this.$store.getters.projs;
      },
      set(val) {
        this.$store.getters.projs;
      }
    }
  },
  async created() {
    await this.$store.dispatch({ type: "loadProjs" });
  },
  async mounted() {
    eventBus.$on("setFilter", filterBy => {
      console.log((this.$root.$refs, 'this.$root.$refs'));
      
      this.$store.dispatch({ type: "loadProjs", filterBy });
    });
  },
  methods: {
    openDetails(id) {
      this.$router.push("/proj/" + id);
    }
  },
  components: {
    filterBy: () => import("../../components/filter/filter-by.vue"),
    markerCard
  }
};
</script>
