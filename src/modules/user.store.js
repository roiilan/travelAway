import { userService } from '../services/user.service.js'
// import SocketService from '../services/socket.service.js';
import socketService from '../services/socket.service.js';
import Swal from "sweetalert2"


var localLoggedinUser = null;
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser);

export default {
    state: {
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, { credentials }) {
            socketService.setup();
            const user = await userService.login(credentials);
            context.commit({ type: 'setUser', user })
                // SocketService.emit('user event', user._id)
            socketService.on(user._id, res => {
                Swal.fire('Someone is intrested in one of your projects!')

            })
            return user;
        },
        async signup(context, { newUserCred }) {
            socketService.setup();
            const user = await userService.signup(newUserCred)
            context.commit({ type: 'setUser', user })
                // SocketService.emit('user topic', user._id)
            socketService.on(user._id, res => {
                Swal.fire('Someone is intrested in one of your projects!')

            })
            return user;
        },
        async logout(context) {
            socketService.setup();
            socketService.off(context.state.loggedinUser._id)
            var res = await userService.logout()
                // context.commit({type: 'setUsers', users: []})
            context.commit({ type: 'setUser', user: null })
            return res
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users })
            return users;
        },
        async removeUser(context, { userId }) {
            var msg = await userService.remove(userId);
            context.commit({ type: 'removeUser', userId })
            return msg;
        },
        async updateUser(context, { user }) {
            console.log(user);

            user = await userService.update(user);
            // context.commit({ type: 'setUser', user })
            return user;
        },

    }
}