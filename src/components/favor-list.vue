<template>
  <div class="favor-list">
    <ul>
      <li v-for="favor in favors" :key="favor._id">
        <toy-preview :favor="favor" @removeToy="removeToy"></toy-preview>
      </li>
    </ul>
  </div>
</template>



<script>
import toyPreview from "@/components/toy-preview.vue";

export default {
  name: "toysList",
  props: {
    toys: Array
  },
  components: {
    toyPreview
  },
  methods: {
    removeToy(id) {
      this.$emit("removeToy", id);
    }
  }
};
</script>

<style  >
</style>
