<template>
    <li class="user-list">
        <button @click="$emit('removeUser', user._id)">Delete User</button>
        <router-link :to="'/userEdit/' + user._id">Updete User</router-link>
        <h2>{{user.fullName}}</h2>
        <img :src="user.imgUrl" :alt="user.fullName">
        <h3>Karma: {{user.karma}}</h3>
        <h3>Join At- date: {{user.joinAt.date}} time: {{user.joinAt.time}}</h3>
        <ul v-if="user.followers.length">
            <h2 v-if="user.followers.length === 1">One follower</h2>
            <h2 v-else>{{user.followers.length}} Followers</h2>
            <li v-for="follower in user.followers" :key="follower._id">
                <h3>Name: {{follower.fullName}}</h3>
                <img :src="follower.imgUrl" :alt="follower.fullName">
            </li>
        </ul>
        <h2 v-else>There are no followers yet</h2> 
        <ul v-if="user.reviews.length">
            <h2 v-if="user.reviews.length === 1">One review</h2>
            <h2 v-else>{{user.reviews.length}} Reviews</h2>
            <li v-for="review in user.reviews" :key="review.txt">
                <h3>Review: {{review.txt}}</h3>
                <h3>Rate: {{review.rate}}</h3>
            </li>
        </ul> 
         <h2 v-else>There are no reviews yet</h2> 
        <!-- <pre>{{user}}</pre> -->
    </li>
</template>

<script>
export default {
    props: ['user'],

}
</script>

<style>
img {
    width: 150px;
    /* height: 350px; */
    background-position: cover;
    /* border-radius: 50%; */

}
</style>