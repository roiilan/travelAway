<template>
  <div class="proj-apply">
    <h1>hi</h1>
    <form @submit.prevent="applyToProj">
      <el-input-number v-model="request.memebersApllied" :min="1" :max="this.proj.membersNeeded"></el-input-number>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3}"
        placeholder="Write something about yourelf :)"
        v-model="request.freeTxt"
      ></el-input>
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
      request: {
        mambersNeeded: this.proj.membersNeeded,
        projOwner: this.proj.createdBy,
        projTitle:this.proj.title,
        projId: this.proj._id,
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

};
</script>

