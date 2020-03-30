<template>
    <div class="flex a-center" v-if="reviews && reviews.length">
          <el-rate
            class="el-rate-avarage"
            v-model="value"
            disabled
            show-score
            text-color="#0b757d"
            :score-template="`${value} (${reviews.length})`"
            :colors="colors"
          ></el-rate> 
        </div>
</template>

<script>
export default {
    props: ['reviews'],
    data() {
        return {
            value: null,
            colors: ["rgb(42, 55, 56)", "rgb(85, 136, 139)", "#938db1"],
        }
    },
    watch: {
        'value'(){
            this.setValue()
        }
    },
    created() {
        this.setValue();
        
    },
    methods: {
        setValue(){
            this.value = this.reviews.reduce((a,b) => a + b.rate, 0) / (this.reviews.length)
        }
    },
}
</script>

<style scoped> 
span.span-reviews{
    margin-left:2px;
    margin-right:2px;
    }

    .flex.a-center{
        font-family: Montserrat;
    }

    .review-count{
        font-size: 13px;
    }
</style>