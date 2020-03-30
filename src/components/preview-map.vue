<template>
    <div>
          <el-carousel class="ratio-16-9">
          <el-carousel-item
            v-for="url in proj.imgUrls"
            :key="url"
          >
            <img :src="url" class="img-on-map" />
          </el-carousel-item>
        </el-carousel>
        <div class="proj-contnet-for-map">
        <h4>{{proj.organization}}</h4>
        <h5>{{proj.title}}</h5>
        <review-avarage-by-id class="review-avarage-for-map" :id="proj._id" />
        </div>
    </div>
</template>

<script>
import reviewAvarageById from '../components/review-avarage-by-id.vue';

export default {
    props: ['proj'],
     components: {
    reviewAvarageById,
  },
}
</script>