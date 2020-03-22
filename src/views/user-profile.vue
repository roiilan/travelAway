<template>
    <div class="user-profile" v-if="user && reviews">
        <pre>{{user}}</pre>
        <pre>{{reviews}}</pre>    
    </div>
</template>
<script>
import {userService} from '../services/user.service.js';

export default {
    data() {
        return {
            user: null,
            reviews: null
        }
    },
    async created() {
        const userId = this.$route.params.id;
        console.log(userId);
        
        this.user = await userService.getById(userId);
        this.reviews = await this.$store.dispatch({type: "loadReviews", userId});  
    },
}
</script>