<template>
  <div class="proj-apply">
    <h1>hi</h1>
    <form @submit.prevent="applyToProj">
      <el-input-number v-model="request.memebersApllied" :min="1" :max="mambersNeeded"></el-input-number>
      {{mambersNeeded}}
      <el-input
        type="textarea"
        :autosize="{ minRows: 3}"
        placeholder="Write something about yourelf :)"
        v-model="request.freeTxt"
      ></el-input>

      <pre>{{proj.createdBy}}</pre>
      <button>Send request!</button>
    </form>

  </div>
</template>

<script>
import SocketService from "../services/socket.service.js";
import { eventBus } from "../services/eventbus-service.js";


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
  methods: {
    applyToProj() {
      SocketService.emit("applyToProj", this.request);
      //  eventBus.$emit('applyToProj', this.request);
      //  this.projOwner.notifications.push(this.request)
       //TODO update data base
       console.log(this.request);
       
       
    }
  },
  created(){
    console.log(this.proj);
    
  }
};
</script>

