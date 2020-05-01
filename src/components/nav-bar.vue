<template>
  <div class="nav-bar-container" :class="{'scrollering': isScrollering, 'off-line':offLine}">
    <nav class="nav-bar width-container flex bet">
      <router-link to="/">
        <img class="logo" src="../assets/icon/help.png" alt="Logo" />
      </router-link>
      <div class="nav-link-container flex col" :class="{'open-menu':openMenu}">
        <!-- <router-link to="/search">Search</router-link> -->
        <!-- <router-link to="/">Home</router-link> -->
        <router-link to="/edit" title="Let's Publish">
          <img src="../assets/svg/project.svg" alt />
          <span>Publish</span>
        </router-link>
        <a v-if="loggedinUser" @click="logout" title="Logout">
          <img src="../assets/svg/log-in.svg" alt />
          <span>Logout</span>
        </a>
        <router-link v-else to="/login" title="Login">
          <img src="../assets/svg/log-in.svg" alt />
          <span>Login</span>
        </router-link>
        <!-- <router-link :to="'/user/' + loggedinUser._id" v-if="loggedinUser" class="img-user-link">
          <img class="img-user" :src="loggedinUser.imgUrl" :title="loggedinUser.fullName" />
        </router-link>-->
        <section class="categories-contianer">
          <a href="#" @click.stop="toglleActive">
            <img src="../assets/svg/tool.svg" alt />
            <span>Categories</span>
          <img :class="{'arrow-down': isActive}" src="../assets/svg/downloading.svg" alt />
          </a>
          <transition name="fade">
            <div class="accodion-categories" v-if="isActive">
              <router-link
                v-for="category in categories"
                :key="category.category"
                :to="'/projs/' + category.category"
              > - {{category.title}}</router-link>
            </div>
          </transition>
        </section>
      </div>
      <img
        @click="toogleMemu"
        class="hamburger"
        :class="{'open-menu':openMenu}"
        src="../assets/svg/menu.svg"
        alt
      />
    </nav>
  </div>
  <!-- <div class="nav-bar-container" :class="{'scrollering': isScrollering}">
    <div class="nav-bar width-container flex a-center between">
      <div class="logo-container flex a-center j-center">
        <router-link to="/">
          <img class="logo" src="../assets/icon/help.png" alt="Logo" />
        </router-link>
      </div>
      <div class="nav-link-container flex col" :class="{'open-menu':openMenu}">
        <router-link to="/search">Search</router-link>
        <router-link to="/edit">Add Project</router-link>
        <router-link to="/">Home</router-link>
        <a v-if="loggedinUser" @click="logout">Logout</a>
        <router-link v-else to="/login">Login</router-link>
        <router-link :to="'/user/' + loggedinUser._id" v-if="loggedinUser" class="img-user-link">
          <img class="img-user" :src="loggedinUser.imgUrl" :title="loggedinUser.fullName" />
        </router-link>
      </div>
      <img @click="toogleMemu" class="hamburger" :class="{'open-menu':openMenu}" src="../assets/svg/menu.svg" alt="">
    </div>
  </div>-->
</template>

<script>
import LoginVue from "../views/Login.vue";
import accordionItem from "./accordion-item.cmp.vue";

export default {
  data() {
    return {
      isScrollering: false,
      openMenu: false,
      offLine: false,
      isActive: false,
      categories: [
        {
          category: "childcare",
          title: "Child Care"
        },
        {
          category: "education",
          title: "Education"
        },
        {
          category: "animalsAndWildlife",
          title: "Animals & Wildlife"
        },
        {
          category: "environmentalProtection",
          title: "Environmental Protection"
        },
        {
          category: "farming",
          title: "Farming"
        },
        {
          category: "scubaDiving",
          title: "Scuba Diving"
        },
        {
          category: "humanitarian",
          title: "Humanitarian"
        },
        {
          category: "healthcare",
          title: "Health Care"
        },
        {
          category: "sports",
          title: "Sports"
        },
        {
          category: "art",
          title: "Art"
        },
        {
          category: "humanRights",
          title: "Human Rigths"
        }
      ]
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    async logout() {
      var res = await this.$store.dispatch({ type: "logout" });
      if (res) {
        this.$notify({
          title: "Success",
          message: "The logout operation was successful",
          type: "success",
          duration: 1500
        });
      }
    },
    handleScroll() {
      this.isScrollering = true;
      if (window.scrollY === 0) {
        this.isScrollering = false;
      }
    },
    toogleMemu() {
      setTimeout(() => {
        console.log("hi");
        this.openMenu = !this.openMenu;
        document.body.classList.toggle("menu-open");
      }, 1);
    },
    handleClick(event) {
      if (!this.openMenu) return;
      this.toogleMemu();
    },
    handlePress(event) {
      if (event.keyCode === 27) {
        this.handleClick();
      }
    },
    toglleActive() {
      this.isActive = !this.isActive;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleClick);
    document.addEventListener("keydown", this.handlePress);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handlePress);
  },
  components: {
    accordionItem
  }
  // watch: {
  //   'loggedinUser.notifications'() {
  //     // console.log(this.loggedinUser.notifications);
  //     console.log('hi!!');
  //   }
  // },
};
</script>

