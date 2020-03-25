import Vue from 'vue'
import Vuex from 'vuex';
import projStore from '../modules/proj.store.js'
import mapStore from '../modules/map.store.js'
import userStore from '../modules/user.store.js';
import reviewStore from '../modules/review.store.js';
import cloudinaryService from '../services/cloudinary.service.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    msg: {
      isShow: false,
      txt: ''
    },
    timeout: '',
  },
  mutations: {
    setMsg(state, { msg }){
      state.msg = msg
     state.timeout = setTimeout (()=>{
        state.msg = {
          isShow: false,
          txt: ''
        }
      },2500)
    },
    closeMsg(state, { msg }){
      state.msg = msg;
      clearTimeout(state.timeout)
    }
  },
  getters: {
     msg(state) {
       return state.msg
     }
  }, 
  actions: {
    async addImg(context, { imgEv }) {
      const img = await cloudinaryService.uploadImg(imgEv)
      return img
  }
  },
  modules: {
    projStore,
    userStore,
    reviewStore,
    mapStore
  }
})
