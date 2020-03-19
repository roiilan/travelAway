



<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import favorPreview from '@/favor-preview.vue'

export default {
  name: 'favor-preview',

}

const user = {
  _id: 'u100',
  fullName: 'Muki',
  karma: 5,
  followers: [{}],
  reviews: [{txt: 'cool!', rate: 5}, {txt: 'didnt show up', rate: 1}],
  zoomUrl: '',
  loc: {lat, lng}
}

const favor = {
  _id: 'p1011',
  title: 'Dog walking / Take my kids away / Picture on the side',
  description: '',
  requestedBy: {},
  takenBy : {},
  startAt: 2872222,
  endsAt: null,
}
  

  
</script>



