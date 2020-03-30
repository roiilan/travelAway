<template>
  <div class="proj-apply">
    <h1>hi</h1>
    <form @submit.prevent="applyToProj">
      <el-input-number v-model="request.memebersApllied" :min="1" :max="mambersNeeded"></el-input-number>
      {{mambersNeeded}}
      <el-input
        type="textarea"
        :autosize="{ minRows: 3}"
        placeholder="Write a few words about your project :)"
        v-model="request.freeTxt"
      ></el-input>
      <button>Send request!</button>
    </form>

  </div>
</template>

<script>
import SocketService from "../services/socket.service.js";

export default {
  name: "projApply",
  props: {
    proj: Object,
    user: Object
  },
  data() {
    return {
      mambersNeeded: this.proj.membersNeeded,
      projOwner: this.proj.createdBy,
      request: {
        memebersApllied: null,
        member: this.user,
        freeTxt: null,
        isApproved: false,
        projOwnerId: this.proj.createdBy._id
      }
    };
  },
  created() {
    // console.log('this.projOwner before:', this.projOwner);


    // if(!this.$store.getters.loggedinUser) return
    // this.msg.from = this.$store.getters.loggedinUser.username
    // SocketService.on('chat addMsg', this.addMsg)
    // SocketService.on('typing', ({from, topic}) =>{
    //     if(topic === this.topic){
    //         this.fromUser = from
    // setTimeout(() =>{ this.fromUser = null }, 1500)

    //     }else{
    //         this.fromUser = null
    //     }

    // })
  },
  methods: {
    applyToProj() {
      SocketService.emit("applyToProj", this.request);
    }
  }
};
</script>

