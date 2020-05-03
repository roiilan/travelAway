<template>
  <form class="add-review flex col" v-if="review" @submit.prevent="save">
    <div class="flex col bet">
      <h3 v-if="!reviews.length">Be the first to give feedback</h3>
      <h3 v-else>Add Review</h3>
      <div class="add-rate-container flex a-center">
        <p>Rate:</p>

        <el-rate v-model="review.rate" text-color="#0b757d" :colors="colors"></el-rate>
      </div>
    </div>
    <div class="flex row">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3}"
        placeholder="Write a few words of review"
        v-model="review.txt"
      ></el-input>
      <button>
        Send
        <img class="btn-img" src="../../assets/png/send-1.png" alt />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["reviews", "review", "proj"],
  data() {
    return {
      colors: this.$store.getters.colors
    };
  },
  methods: {
    save() {
      if (!this.review.txt) {
        this.$notify({
          title: "Warning",
          message: "Can't send without text",
          type: "warning",
          duration: 2500
        });
        return;
      }
      this.$emit("save", this.review);
    }
  }
};
</script>