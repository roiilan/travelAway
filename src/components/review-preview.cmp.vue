<template>
  <div class="review-preview flex col">
    <form @submit.prevent="updateReview">
    <div class="flex a-center between">
      <h3 class="review-by flex">
        <img class="img-profile" :src="reviewForUpdate.by.imgUrl" alt />
        {{reviewForUpdate.by.fullName}}:
      </h3>
      <div class="flex a-center">
        <div v-if="isEdit" class="add-rate-container flex a-center j-center">
          <h3>Rate ({{reviewForUpdate.rate}}):</h3>
          <el-rate v-model="reviewForUpdate.rate" text-color="#0b757d" :colors="colors"></el-rate>
        </div>
        <el-rate
          v-else
          v-model="reviewForUpdate.rate"
          disabled
          show-score
          text-color="rgb(85, 136, 139)"
          score-template="{value} / 5"
          :colors="colors"
        ></el-rate>

        <div>
          <img
            class="btn-img"
            title="Delete"
            @click.stop="removeReview"
            src="../assets/icon/rubbish.png"
            alt
          />

          <img
            class="btn-img"
            title="Update"
            @click="isEdit = !isEdit"
            src="../assets/icon/edit.png"
            alt
          />
        </div>
      </div>
    </div>
    <div v-if="isEdit" class="flex">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3}"
        placeholder="Write a few words of review"
        v-model="reviewForUpdate.txt"
      ></el-input>
      <button>
        Update
        <!-- <img class="btn-img" src="../assets/icon/edit.png" alt /> -->
      </button>
    </div>
    <p v-else>{{reviewForUpdate.txt}}</p>
    </form>
  </div>
</template>

<script>
import { eventBus } from "../services/eventbus-service.js";

export default {
  props: ["review"],
  data() {
    return {
      reviewForUpdate: null,
      isEdit: false,
      colors: ["rgb(42, 55, 56)", "rgb(85, 136, 139)", "rgb(107, 243, 255)"]
    };
  },
  created() {
    this.reviewForUpdate = JSON.parse(JSON.stringify(this.review));
  },
  methods: {
    removeReview() {
      eventBus.$emit("removeReview", this.review._id);
    },
    updateReview() {
      eventBus.$emit("updateReview", this.reviewForUpdate);
    }
  }
};
</script>