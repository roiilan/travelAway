<template>
<div class = "home">
<video autoplay muted loop id="myVideo">
  <source src='../../video/heroHeader.mp4' type="video/mp4">
</video>
   <div class="overlayText">
        <p id="welcom-txt">WalkWays</p>
    </div>
  <div class="category-container">  

    <router-link :to="'/projs/' + category.category" v-for="category in categories" :key="category.category" :class="category.category" class="category">
      <img :src="category.imgUrl" />
       <div class="img-tag" :class="category.category"> {{category.title}} </div>
      </router-link>
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
        title:'Farming',
        imgUrl:'https://www.thebalancesmb.com/thmb/zLMhuQKCL24jIckZmKqw6E4n2hI=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-585859259-57997e215f9b589aa94c4243.jpg'
      },
      {
        category:'scubaDiving',
        title:'Scuba Diving',
        imgUrl:'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/i8v1v92sfkikn0ro47ba/ScubaDivingLessonsinGuambyJNSDives.webp'
      },
      {
        category:'humanitarian',
        title:'Humanitarian',
        imgUrl:'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/387-mj-5779.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=19310451bd014a0ee3714a2fc0bc90b3'
      },
      {
        category:'healthcare',
        title:'Health Care',
        imgUrl:'https://mikedanneskjold.files.wordpress.com/2013/01/sickness-3rd-world-doctor.jpg'
      },
      {
        category:'sports',
        title:'Sports',
        imgUrl:'https://www.om.org/img/l23630.jpg'
      },
      {
        category:'art',
        title:'Art',
        imgUrl:'https://levlalev.com/wp-content/uploads/2019/06/Art-Projec-to-benefit-orphans.jpg'
      },
      {
        category:'humanRights',
        title:'Human Rigths',
        imgUrl:'https://i.ytimg.com/vi/fmT2soVvyLA/maxresdefault.jpg'
      },

    ]

     
    
  }

},
  components: {
  }
}
</script>

<style>



</style>
