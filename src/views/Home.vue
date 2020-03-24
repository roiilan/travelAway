<template>
  <div class="category-container" > 
    <div v-for="category in categories">
    <router-link :to="'/projs/' + category.category">
      <!-- {{category.title}} -->
      <img :src="category.imgUrl" :class="category.category"/>
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
        imgUrl:'https://lh3.googleusercontent.com/proxy/c_Ydka5HZ8h71msaNz1UwRmpdPNA9but3__WgAKyg47284eUiWlHkJQnUejj01sDc6u1ZcNkXDmC-lPPoib3r343py72rK515QfY6KERBbTdY46gGnM7B2aB--t95HbQ3_Sm02_z8ibdajyg2G9afw'
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

<style scoped>


.category-container{
  /* Temporary */
  margin-top: 110px;

  max-width:1080px;
  display: grid;
  grid-template-columns:3fr 4fr 3fr 4fr;
  grid-template-rows:3fr 2fr 1fr 1fr 3fr;
  gap: 1rem;
}

img{
  width: 25%;
    /* height: 22vw;
    object-fit: cover;
    border-radius: 3px; */
}

/* img.scubaDiving{
   grid-row:1/3;
  grid-column: 4/-1
}
img.childcare{
   grid-row:2/4;
  grid-column: 2/3
}

img.education{
  grid-row:5/6;
  grid-column: 3/4
}
img.environmentalProtection{
  grid-row:3/5;
  grid-column: 4/-1
}
.animalsAndWildlife{
  grid-row:1/2;
  grid-column: 1/3
}
img.farming{
  grid-row:1/2;
  grid-column: 3/4
}
img.humanitarian{
  grid-row:2/5;
  grid-column: 3/4
}
img.healthcare{
  grid-row:5/-1;
  grid-column: 1/2
}
img.sports{
  grid-row:4/-1;
  grid-column: 2/3
}
img.art{
  grid-row:2/5;
  grid-column: 1/2
}
img.humanRights{
  grid-row:5/6;
  grid-column: 4/-1
} */

</style>
