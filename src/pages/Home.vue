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
    <div class="category-container width-container">
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

    <h1 class="details-header">Our community Activity</h1>
    <div class="walk-ways-details width-container" v-if="projs">
      <h1 class="divider">
        <img src="https://image.flaticon.com/icons/svg/2628/2628442.svg" />Projects
        <!-- <span class="space">{{count}}</span> -->
        <span class="space">{{projs.length}}</span>
      </h1>
      <h1 class="divider">
        <img src="https://image.flaticon.com/icons/svg/978/978012.svg" />Voulnteers
        <span class="space">{{users.length}}</span>
      </h1>
      <h1 class="divider">
        <img src="https://image.flaticon.com/icons/svg/921/921439.svg" />Countries
        <span class="space">{{countriesCount}}</span>
      </h1>
    </div>

    <ul v-if="projs" class="around-the-world-preview width-container">
      <li v-for="proj in projs" :key="proj._id" class="around-the-world-card">
        <marker-card
          :proj="proj"
          :title="proj.description.substring(0,80) +'... Click to read more!!'"
          class="proj-preview-card"
          @click.native="openDetails(proj._id)"
        />
      </li>
    </ul>
    <section v-else class="loading-container width-container">
      <img v-for="i in 6" :key="i" src="../assets/svg/loading.svg" alt />
    </section>
    <div class="proj-preview-card">
      <router-link
        class="show-more"
        title="Show more about 'around the world'"
        to="/projs/aroundTheWorld"
      >Show more</router-link>
    </div>
  </div>
</template>

<script>
import { utilService } from "../services/util.service.js";
import { projService } from "../services/proj.service.js";
import SocketService from "../services/socket.service.js";
import markerCard from "../components/marker-card.vue";

// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      projs: null,
      reviews: null,
      categories: null,
      users: null,
    };
  },
  async created() {
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    this.projs = await this.$store.dispatch({ type: "loadProjs", limit: 6 });
    this.categories = projService.loadCategoties();
    SocketService.setup();
    SocketService.on("send request", request => {
      // this.projOwner.notifications.push(request)
      console.log(request, "request arrived");
    });
  },
  methods: {
    openDetails(id) {
      this.$router.push("/proj/" + id);
    }
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
    markerCard
  }
};
</script>

<style scoped>
</style>
