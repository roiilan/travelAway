<template>
    <div class="login-page">

        <!-- <button v-if="loggedinUser" @click="logout">Logout</button> -->
        <form 
        v-if="credentials && !isSignup"
        class="login-card flex col"
        @submit.prevent="login"
        >
            <h2>Log in to your account</h2>
            <h3>Username:</h3>
            <input type="text" v-model="credentials.username" required>
            <h3>Password:</h3>
            <input type="password" v-model="credentials.password" required>
            <button class="login-btn" type="submit">Login</button>
            <h3>Don't have an account? <span class="login-btn" @click.stop="isSignup = true">Signup</span></h3>
        </form>
        <form 
        v-if="newUserCred && isSignup"
        class="login-card flex col"
        @submit.prevent="signup" 
        >
            <h3>Full-Name:</h3>
            <input type="text" v-model="newUserCred.fullName" placeholder="FullName" required>
            <h3>Username:</h3>
            <input type="text" v-model="newUserCred.username" placeholder="Username" required>
            <h3>Password:</h3>
            <input type="password" v-model="newUserCred.password" placeholder="Password" required>
            <label > 
                <input @change="uploadImg" type="file" hidden>
                <h3 class="login-btn flex a-center around">Upload Img <img  :src="newUserCred.imgUrl" title="Upload Img:" /></h3>
                
            </label>
            <button >Sign-Up</button>
            <h3 class="flex a-center between" >Go back to login <span class="login-btn" @click.stop="isSignup = false">Login</span></h3>

        </form>
         <!-- <ul class="login-user" v-if="users">
        <user-list 
        v-for="user in users" :key="user._id" 
        :user="user" 
        @removeUser="removeUser" 
        />
        </ul> -->
    </div>
</template>

<script>
import { userService } from '../services/user.service.js'
// import userList from '../components/user-list.cmp.vue'

export default {
    name: 'Login',
    data() {
        return {
            users: null,
            credentials: null,
            newUserCred: null,
            isSignup: false,
            params: {
                    client_id: "638406108101-fgbubnomg43t3hvbh47v4p26tk7a7ltg.apps.googleusercontent.com"
                },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    async created() {
        this.users = await this.$store.dispatch({ type:'loadUsers' });
        this.credentials = {username: 'Muki', password: '111'},
        this.newUserCred = userService.getEmptyUser()        
    },
    components: {
        // userList
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
            console.log(img.url);
            
            this.newUserCred.imgUrl = img.url      
        },
        async removeUser(userId){
            var msg = await this.$store.dispatch({ type:'removeUser', userId})
            console.log('msg: ', msg);
        },
        onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        }
    },
     computed: {
    loggedinUser(){
      return this.$store.getters.loggedinUser;
    }
  }
}
</script>

<style>
.login-user {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>