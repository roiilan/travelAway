<template>
  <div class="favor-list">
    <ul>
      <li v-for="favor in favors" :key="favor._id">
        <favor-preview :favor="favor"></favor-preview>
      </li>
    </ul>
  </div>
</template>



<script>
import favorPreview from "./favor-preview";

export default {
  name: "favorsList",
data(){
  return{
    favors:favors,

  }
},
  components: {
    favorPreview
  },

};


// const users = [
//   {
  
//   _id: 'u100',
//   fullName: 'Ruki',
//   karma: 5,
//   followers: [{}],
//   reviews: [{txt: 'baaaaa!', rate: 5}, {txt: 'didnt show up', rate: 2}],
//   zoomUrl: '',
//   // loc: {lat, lng}
// }
// ,{  _id: 'u102',
//   fullName: 'Muki',
//   karma: 5,
//   followers: [{}],
//   reviews: [{txt: 'cool!', rate: 5}, {txt: ' show up!', rate: 1}],
//   zoomUrl: '',
//   // loc: {lat, lng}
//   }
//   ,{
//   _id: 'u103',
//   fullName: 'Zuki',
//   karma: 5,
//   followers: [{}],
//   reviews: [{txt: 'nice man!', rate: 5}, {txt: 'so and so', rate: 1}],
//   zoomUrl: '',
//   // loc: {lat, lng}
//   },
//   ]




const favors = [{
  _id: 'p1031',
  title: 'Dog walking ',
  description: 'take my dog out!',
  requestedBy: {},
  takenBy : {},
  startAt:1584631383289,
  endsAt: null,
    imgUrl:'https://i.pinimg.com/originals/67/01/79/670179bf2f640c22b01556a0af74a97a.jpg'

},
{
  _id: 'p1041',
  title: 'Take my kids away',
  description: 'Take my kids out!',
  requestedBy: {},
  takenBy : {},
  startAt: 1584631383289,
  endsAt: null,
  imgUrl:'https://www.newhitsingles.com/wp-content/uploads/2018/04/Justin-Timberlake-Links-Up-With-The-Selfie-Kid-In-Boston.jpg'

},
{
  _id: 'p1051',
  title: 'Hang on the side',
  description: 'Take a hammer and nail that picture!',
  requestedBy: {},
  takenBy : {},
  startAt:1584631383289,
  endsAt: null,
  imgUrl:'https://cdn.cliqueinc.com/posts/216920/how-to-take-a-selfie-216920-1554893462671-image.700x0c.jpg'

},

]



</script>

<style  >
</style>
