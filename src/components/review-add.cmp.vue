<template>
    <form class="add-review flex" v-if="review" @submit.prevent="$emit('save', review)">
      <div class="add-rate-container flex a-center j-center">
     
      <h3>Rate ({{review.rate}}):</h3>
    
        <el-rate
          v-model="review.rate"
          text-color="#0b757d"
          :colors="colors">
        </el-rate>
      </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="Write a few words of review"
          v-model="review.txt"
        ></el-input>
  
      <button>Send <img class="btn-img" src="../assets/icon/send-1.png" alt=""></button>
    </form>
    
</template>

<script>
export default {
    props: ['review', 'proj'],
    data() {
        return {
            colors: ["rgb(42, 55, 56)", "rgb(85, 136, 139)", "rgb(107, 243, 255)"],
        }
    },
}
</script>