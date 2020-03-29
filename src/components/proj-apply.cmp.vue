<template>
    <div class="proj-apply">
<h1>hi</h1>
<form @submit.prevent="applyToProj">
   <el-input-number v-model="request.memebersApllied" :min="1" :max="mambersNeeded"></el-input-number>
   {{mambersNeeded}}      <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="Write a few words about your project :)"
          v-model="request.freeTxt"
        ></el-input>
        
   
    <button> Send request! </button>
    </form>
    <!-- <pre>
          {{proj}}
          </pre> -->
    </div>
    
</template>

<script>

import SocketService from '../services/socket.service.js';


export default {
  name:"projApply",
  props:{
    proj:Object,
    user:Object
  },
  data(){
    return{
      mambersNeeded:this.proj.membersNeeded,
      projOwner:this.proj.createdBy,
      request:{
        memebersApllied:null,
        member:this.user,
        topic:this.proj._id,
        freeTxt:null,
        isApproved:false
      }
    }
  },
    created() {
      console.log(this.projOwner); 
    SocketService.setup();
    SocketService.emit('proj topic', this.topic)
        SocketService.on('send request', request =>{
          this.projOwner.notifications.push(request)
          console.log(this.projOwner);
        })
        

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
  methods:{
    applyToProj(){
      SocketService.emit('applyToProj', this.request)

    }
  }

}
</script>

export default {
     props: {
     toy: Object
  },
  data() {
    return {
      msg: {from: '', txt: ''},
      msgs: [],
      fromUser:null,
      topic : this.toy._id,
      historyMsg :[]
    }
  },


  destroyed() {
    SocketService.off('chat addMsg', this.addMsg)
    SocketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msg.from = this.$store.getters.loggedinUser.username
      this.msgs.push(msg)
         
    },
    sendMsg() {
      if(!this.$store.getters.loggedinUser) return
      this.msg.from = this.$store.getters.loggedinUser.username
      console.log('Sending', this.msg);
      SocketService.emit('chat newMsg', this.msg)
      this.msg = {from: '', txt: ''};


    },
    changeTopic() {
      SocketService.emit('chat topic', this.topic)
    },
    writing(){
    SocketService.emit('writingUser', {from:this.msg.from, topic:this.topic})
    console.log(this.msg.txt);
    if (!this.msg.txt)  this.fromUser = null      
    },
     
        

  },
  watch: {
    topic() {
      // console.log('Topic Changed', this.topic);
    },
    'msg.txt'() {
      // console.log('MSG CHANGED');
      this.writing()

    },
    msgs: {
      handler() {
        // console.log('New msg arrival!');
      }
    }
  },


}