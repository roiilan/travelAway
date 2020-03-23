<template>
  <div id="app">
    <nav-bar/> 
<router-view/>
  </div>
</template>


<script>
import navBar from "./components/nav-bar.vue"

export default {
  name:'projApp',
    components: {
    navBar,
    }
};
</script>

