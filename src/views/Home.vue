<template>
  <div class="home">
    <h1>Nailed it</h1>
    <div v-for="category in categories">
    <router-link :to="'/projs/' + category.category">
      {{category.title}}
      <img :src="category.imgUrl"/>
      </router-link>>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
data(){
  return{
    categories:[
      {
        category:'childcare',
        title:'Child Care',
        imgUrl:'https://s23916.pcdn.co/wp-content/uploads/2019/03/why-your-kids-need-boy-girl-relationships.jpg'
      },
      {
        category:'education',
        title:'Education',
        imgUrl:'https://cdn.shopify.com/s/files/1/1151/8374/articles/smaller_lead_photo_2048x.jpg?v=1523044466'
      },
      {
        category:'animalsAndWildlife',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'environmentalProtection',
        title:'Environmental Protection',
        imgUrl:'https://beaches.lacounty.gov/wp-content/uploads/2016/10/BeachCleaning.jpg'
      },
      {
        category:'farming',
        title:'Animals & Wildlife',
        imgUrl:'https://www.thebalancesmb.com/thmb/zLMhuQKCL24jIckZmKqw6E4n2hI=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-585859259-57997e215f9b589aa94c4243.jpg'
      },
      {
        category:'scubaDiving',
        title:'Animals & Wildlife',
        imgUrl:'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/i8v1v92sfkikn0ro47ba/ScubaDivingLessonsinGuambyJNSDives.webp'
      },
      {
        category:'humanitarian',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'healthcare',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'sports',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'communityDev',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'art',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },
      {
        category:'humanRights',
        title:'Animals & Wildlife',
        imgUrl:'https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg'
      },

    ]

     
    
  }

},
  components: {
  }
}
</script>
