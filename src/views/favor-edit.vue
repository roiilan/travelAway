<template>
    <div class="favor-edit" v-if="favor">
        <h2 v-if="favor._id">{{favor.requestedBy}}</h2>
        <input type="text" v-model="favor.title">
        <textarea v-model="favor.description" cols="30" rows="10"></textarea>
        <input type="date" v-model="favor.startAt">
        <input type="date" v-model="favor.endsAt">
        <input type="url" v-model="favor.imgUrl">
        <input type="file" ref="upLoadFile" hidden>
        <img :src="favor.imgUrl" alt="../assets/svg/loading.svg" @click="$refs.upLoadFile.click()">
        <img src="../assets/svg/loading.svg">
        <pre>{{favor}}</pre>
    </div>
</template>

<script>
import {favorService} from '../services/favor.service.js'
export default {
    data() {
    return {
      favor: null
    }
  },
  async created() {
      const favorId = this.$route.params.id;
      if (favorId) {
          var favor = await this.$store.dispatch({
               type: 'loadFavor',
               favorId
           })
           this.favor = JSON.parse(JSON.stringify(favor))
      } else {
          this.favor = favorService.getEmptyFavor();
      }
  },
//   computed: {
//         startAt(){
//             var time = new Date(this.favor.startAt);
//             return time.getFullYear() + '-' + this.padNum((time.getMonth() + 1)) + '-' + this.padNum(time.getDate());
//         },
//         endAt(){
//             var time = new Date(this.favor.endAt);
//             return time.getFullYear() + '-' + this.padNum((time.getMonth() + 1)) + '-' + this.padNum(time.getDate());
//             // return time.getFullYear() + '/' + this.padNum((time.getMonth() + 1)) + '/' + this.padNum(time.getDate()) + ' ' + time.toString().split(' ')[4];
//         }
//     },
//     methods:{
//         padNum(num){
//             return (num < 10)? '0' + num: num;
//         },
//         // editBug(){
//         //     eventBus.$emit('editBug', this.bug)
//         // }
//     }
}
</script>