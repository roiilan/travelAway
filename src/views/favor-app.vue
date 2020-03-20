<template>
  <div class="favor-app">
    <router-link to="/edit">
    Add Favor
    </router-link>
    <favor-list />
  </div>
</template>

<script>
// @ is an alias to /src
import favorList from "@/components/favor-list.vue";

export default {
  name: "favorApp",
  components: {
    favorList,
  },

};
</script>


<style >
</style>