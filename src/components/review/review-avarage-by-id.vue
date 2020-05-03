<template>
    <div class="review-avarage-by-id">
        <review-avarage :reviews="reviews" />
    </div>
</template>

<script>
import reviewAvarage from "./review-avarage.cmp.vue";

export default {
    props: ['id'],
    data() {
        return {
            reviews: [],
        }
    },
    async created(){
        this.reviews = await this.$store.dispatch({
      type: "loadReviews",
      id: this.id
    });
    },
    components: {
        reviewAvarage,
    }
}
</script>