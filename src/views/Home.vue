<template>
  <div class="home">
    <div class="video-bcg">
      <video autoplay muted loop id="myVideo">
        <source src="../../video/heroHeader.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="overlayText">
      <h3 id="welcom-txt">WalkWays</h3>
      <p>
        “The best way to find yourself is to lose yourself in the service of others.”
        <br />
        <span class="gandy">Mahatma Gandhi</span>
      </p>
    </div>
    <div class="category-container">
      <router-link
        :to="'/projs/' + category.category"
        v-for="category in categories"
        :key="category.category"
        :class="category.category"
        class="category"
      >
        <img :src="category.imgUrl" />
        <div class="img-tag" :class="category.category">{{category.title}}</div>
      </router-link>

  </div>

  <div class="walk-ways-details" v-if="projs">
    <h1>Projs:{{projs.length}} </h1>
    <h1>Voulnteers:{{users.length}}</h1>
    <h1>Countries Around The World:{{countriesCount}}</h1>
    </div>

      <h1 class="details-header">WalkWays Activity</h1>
    <div class="walk-ways-details" v-if="projs">
      <h1><img src="https://image.flaticon.com/icons/svg/2628/2628442.svg">Projects<span class="space">{{projs.length}}</span></h1>
      <h1><img src="https://image.flaticon.com/icons/svg/978/978012.svg">Voulnteers<span class="space">{{users.length}}</span></h1>
      <h1><img src="https://image.flaticon.com/icons/svg/921/921439.svg">Countries<span class="space">{{countriesCount}}</span></h1>
    </div>

    <ul class="around-the-world-preview">
      <li
        v-for="proj in worldProjs"
        :key="proj._id"
        
        class="around-the-world-card"
      >
       <!-- <preview-map
              :proj="proj"
              title="Click to view project details"
            /> -->
        <router-link :to="'/proj/' + proj._id">
          <div class="world-projs-img-conatainer ratio-card">
            <img :src="proj.imgUrls[0]" class="proj-preview-img" />
          </div>
          <div class="world-prjs-country-details">
            <img
              :src="`https://www.countryflags.io/${proj.position.short_country}/shiny/64.png`"
              v-if="proj.position.short_country"
              class="world-proj-flag"
            />
            <h5 v-if="proj.position.city">{{proj.position.city}},</h5>
            <h5 v-else>{{proj.position.region}},</h5>
            <h5>{{proj.position.country}}</h5>
          </div>
          <review-avarage-by-id class="review-avarage-for-list" :id="proj._id" />
          <h5>{{proj.title}}</h5>
          <h6>{{proj.description.substring(0,80) +'...'}}</h6>
          <h6>rate: {{proj.rate}}</h6>
        </router-link>
      </li>
    </ul>
    <router-link to="/projs/aroundTheWorld">More around the world</router-link>
  </div>
</template>

<script>
import { utilService } from "../services/util.service.js";
import reviewAvarageById from "../components/review-avarage-by-id.vue";
import SocketService from "../services/socket.service.js";
import previewMap from '../components/preview-map.vue';


// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      projs: null,
      worldProjs: null,
      users: null,
      reviews:null,
      categories: [
        {
          category: "childcare",
          title: "Child Care",
          imgUrl:
            "https://s23916.pcdn.co/wp-content/uploads/2019/03/why-your-kids-need-boy-girl-relationships.jpg"
        },
        {
          category: "education",
          title: "Education",
          imgUrl:
            "https://cdn.shopify.com/s/files/1/1151/8374/articles/smaller_lead_photo_2048x.jpg?v=1523044466"
        },
        {
          category: "animalsAndWildlife",
          title: "Animals & Wildlife",
          imgUrl:
            "https://i.pinimg.com/originals/f6/b8/c2/f6b8c285b662090279a4c1f5089bb53d.jpg"
        },
        {
          category: "environmentalProtection",
          title: "Environmental Protection",
          imgUrl:
            "https://beaches.lacounty.gov/wp-content/uploads/2016/10/BeachCleaning.jpg"
        },
        {
          category: "farming",
          title: "Farming",
          imgUrl:
            "https://www.thebalancesmb.com/thmb/zLMhuQKCL24jIckZmKqw6E4n2hI=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-585859259-57997e215f9b589aa94c4243.jpg"
        },
        {
          category: "scubaDiving",
          title: "Scuba Diving",
          imgUrl:
            "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/i8v1v92sfkikn0ro47ba/ScubaDivingLessonsinGuambyJNSDives.webp"
        },
        {
          category: "humanitarian",
          title: "Humanitarian",
          imgUrl:
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/387-mj-5779.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=19310451bd014a0ee3714a2fc0bc90b3"
        },
        {
          category: "healthcare",
          title: "Health Care",
          imgUrl:
            "https://mikedanneskjold.files.wordpress.com/2013/01/sickness-3rd-world-doctor.jpg"
        },
        {
          category: "sports",
          title: "Sports",
          imgUrl: "https://www.om.org/img/l23630.jpg"
        },
        {
          category: "art",
          title: "Art",
          imgUrl:
            "https://levlalev.com/wp-content/uploads/2019/06/Art-Projec-to-benefit-orphans.jpg"
        },
        {
          category: "humanRights",
          title: "Human Rigths",
          imgUrl: "https://i.ytimg.com/vi/fmT2soVvyLA/maxresdefault.jpg"
        }
      ]
    };
  },

  async created() {
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    this.projs = await this.$store.dispatch({ type: "loadProjs" });
    
    
    let worldProjs = JSON.parse(JSON.stringify(this.projs));
    var randomProjs = [];
    for (var i = 0; i < 8; i++) {
      var randomNum = utilService.getRandomInt(0, worldProjs.length);
      randomProjs.unshift(worldProjs[randomNum]);
      worldProjs.splice(randomNum, 1);
      randomNum = 0;
    }
    this.worldProjs = randomProjs;
    SocketService.setup();
    SocketService.on("send request", request => {
      // this.projOwner.notifications.push(request)
      console.log(request, "request arrived");
    });
      
    

    console.log(this.users);
    
    
    //  window.scrollTo(515,515)
    //  window.scrollTo(0,0)
  },
  computed: {
    countriesCount() {
      let countriesArr = [];
      this.projs.forEach(proj => {
        !countriesArr.includes(proj.position.country)
          ? countriesArr.push(proj.position.country)
          : "";
      });
      return countriesArr.length;
    }
  },
  components: {
    reviewAvarageById,
    previewMap
  }
};
</script>

<style scoped>
</style>
