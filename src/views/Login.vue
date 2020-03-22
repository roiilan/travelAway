<template>
    <div>
        <button v-if="loggedinUser" @click="logout">Logout</button>
        <form @submit.prevent="login" v-else-if="credentials">
            <input type="text" v-model="credentials.username" required>
            <input type="password" v-model="credentials.password" required>
            <button>Login</button>
            <pre>{{credentials}}</pre>
        </form>
        <form @submit.prevent="signup" v-if="newUserCred">
            <input type="text" v-model="newUserCred.username" placeholder="Username" required>
            <input type="password" v-model="newUserCred.password" placeholder="Password" required>
            <input type="text" v-model="newUserCred.fullName" placeholder="FullName" required>
            <label class="favor-edit-upload-img"> 
                <input @change="uploadImg" type="file" hidden>
                <img :src="newUserCred.imgUrl" >
                <p class="favor-edit-upload-txt">Upload your own! </p>
            </label>
            <button>Sign Up</button>
            <pre>{{newUserCred}}</pre>
        </form>
    <ul class="login-user" v-if="users">
        <user-list 
        v-for="user in users" :key="user._id" 
        :user="user" 
        @removeUser="removeUser" 
        @removeReview="removeReview"
        @addReview="addReview"
        />
    </ul>
    </div>
</template>

<script>
import { userService } from '../services/user.service.js'
import userList from '../components/user-list.cmp.vue'

export default {
    name: 'Login',
    data() {
        return {
            users: null,
            credentials: null,
            newUserCred: null
        }
    },
    async created() {
        this.users = await this.$store.dispatch({ type:'loadUsers' });
        this.credentials = {username: 'Muki', password: '111'},
        this.newUserCred = userService.getEmptyUser()        
    },
    components: {
        userList
    },
    methods: {
        async login(){
            if (this.credentials.password.length < 3 || this.credentials.username.length < 3) return
            var user = await this.$store.dispatch({ type:'login',  credentials:this.credentials})
            if (user) {
                this.$router.push('/')
            }
        },
        async signup(){
            if (this.newUserCred.password.length < 3 || this.newUserCred.username.length < 3 || this.newUserCred.fullName.length < 3) return
            var user = await this.$store.dispatch({ type:'signup',  newUserCred:this.newUserCred})
            console.log('user: ', user);
            this.$router.push('/')
        },
        async uploadImg(ev){
            var img = await this.$store.dispatch({
                type:'addImg',
                imgEv:ev
            })
            this.newUserCred.imgUrl = img.url      
        },
        async logout(){
            var res = await this.$store.dispatch({ type:'logout'})
            if (res) {
                console.log('res: ', res);
                this.$router.push('/')
            }
        },
        async removeUser(userId){
            var msg = await this.$store.dispatch({ type:'removeUser', userId})
            console.log('msg: ', msg);
        },
        async removeReview(ids){
            console.log('ids: ', ids);
            
            var msg = await this.$store.dispatch({ type:'removeReview', ids});
            console.log('msg: ', msg);
        },
        async addReview(reviewAndUser){
            console.log('reviewAndUser: ', reviewAndUser);
            
            var review = await this.$store.dispatch({ type:'addReview', reviewAndUser});
            console.log('review: ', review);
        }
    },
     computed: {
    loggedinUser(){
      return this.$store.getters.loggedinUser;
    }
  },
}
</script>

<style>
.login-user {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>