import Vue from 'vue'
import Vuex from 'vuex';
import favorStore from '../modules/favor.store.js'
import mapStore from '../modules/map.store.js'
// import userStore from '../modules/user.store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  getters: {
  }, 
  actions: {
  },
  modules: {
    favorStore,
    // mapStore
    // userStore,
  }
})
