<template>
  <section class="user-profile-for-details">
    <h3 class="container-link-img">
      <transition name="fade">
        <img @click="scrolleTo" class="link-img" src="../../assets/svg/link.svg" alt />
      </transition>
      <span>Created by</span>
    </h3>
    <section class="flex">
      <router-link :to="'/user/' + user._id">
        <img class="avatar avatar-m" :src="user.imgUrl" :alt="user.fullName" :title="user.fullName" />
      </router-link>
      <section>
        <p>{{user.fullName}}</p>
        <p>Join: {{user.joinAt.date}}, {{user.joinAt.time}}</p>
        <review-avarage-by-id class="review-avarage" :id="user._id" :isUser="true" />
      </section>
    </section>
  </section>
</template>

<script>
import reviewAvarageById from '../review/review-avarage-by-id.vue';

export default {
  props: {
    user: Object
  },
  methods: {
    scrolleTo(ev) {
      window.scrollTo(0, ev.target.offsetTop - 200);
    }
  },
   components: {
       reviewAvarageById
   }
};
</script>