import Vue from 'vue'
import Vuex from 'vuex';
import favorStore from '../modules/favor.store.js'
// import mapStore from '../modules/map.store.js'
import userStore from '../modules/user.store.js';
import reviewStore from '../modules/review.store.js';
import cloudinaryService from '../services/cloudinary.service.js'


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
    async addImg(context, { imgEv }) {
      const img = await cloudinaryService.uploadImg(imgEv)
      return img
  }
  },
  modules: {
    favorStore,
    userStore,
    reviewStore,
  }
})
