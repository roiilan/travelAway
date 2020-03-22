<template>
    <div>
        <button v-if="loggedinUser" @click="logout">Logout</button>
        <form @submit.prevent="login" v-else>
            <input type="text" v-model="credentials.fullName">
            <input type="password" v-model="credentials.password">
            <button>Login</button>
        </form>
    <ul class="login-user" v-if="users">
        <user-list v-for="user in users" :key="user._id" :user="user"/>
    </ul>
    </div>
</template>

<script>
import userList from '../components/user-list.cmp.vue'
export default {
    data() {
        return {
            users: null,
            credentials: {fullName: 'Muki Ben Moshe', password: '111'}
        }
    },
    async created() {
        this.users = await this.$store.dispatch({ type:'loadUsers' })        
    },
    components: {
        userList
    },
    methods: {
        async login(){
          var user = await this.$store.dispatch({ type:'login',  credentials:this.credentials})
          if (user) {
              this.$router.push('/')
          }
        },
        async logout(){
          var res = await this.$store.dispatch({ type:'logout'})
          if (res) {
              console.log('res: ', res);
              
              this.$router.push('/')
          }
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