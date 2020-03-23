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

    ]

     
    
  }

},
  components: {
  }
}
</script>
