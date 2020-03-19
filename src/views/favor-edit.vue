<template>
    <div class="favor-edit" v-if="favor">
        <input type="text" v-model="favor.requestedBy">
        <input type="text" v-model="favor.title">
        <textarea v-model="favor.description" cols="30" rows="10"></textarea>
        <input type="date" v-model="startAt">
        <pre>{{favor}}</pre>
        <pre>{{startAt}}</pre>
    </div>
</template>

<script>
export default {
    data() {
    return {
      favor: null
    }
  },
  async created() {
     this.favor = await this.$store.dispatch({
          type: 'loadFavor',
          favorId: this.$route.params.id
      });
  },
  computed: {
        startAt(){
            var time = new Date(this.favor.startAt);
            return this.padNum(time.getDate()) + '/' + this.padNum((time.getMonth() + 1)) + '/' + time.getFullYear();
        },
        // updatedAt(){
        //     var time = new Date(this.bug.updatedAt);
        //     return time.getFullYear() + '/' + this.padNum((time.getMonth() + 1)) + '/' + this.padNum(time.getDate()) + ' ' + time.toString().split(' ')[4];
        // }
    },
    methods:{
        padNum(num){
            return (num < 10)? '0' + num: num;
        },
        // editBug(){
        //     eventBus.$emit('editBug', this.bug)
        // }
    }
}
</script>