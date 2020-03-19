import {favorService} from '../services/favor.service.js'


export default {
    state: {
        favors: [],
    },
    mutations: {
      setFavors(state, {favors}){
        state.favors = favors
      },
      addFavor(state, {favor}) {
        state.favors.unshift(favor)
      },
      updateFavor(state, {favor}) {
        const idx = state.favors.findIndex(currFavor => currFavor._id === favor._id)
        state.favors.splice(idx, 1, favor)
      },
      removeFavor(state, {favorId}) {
        const idx = state.favors.findIndex(currFavor => currFavor._id === favorId)
        state.favors.splice(idx, 1)
      }
    },
    getters: {
        favors(state){
        return state.favors
      }
    }, 
    actions: {
        async loadFavors(context, {}){       
        const favors = await favorService.query()
        // async loadFavors(context, {filterBy}){       
        // const favors = await favorService.query(filterBy)
        context.commit({type: 'setFavors', favors})
        return favors
      },
        async loadFavor(context, {favorId}){
        const favor = await favorService.getById(favorId)
        context.commit({type: 'updateFavor', favor})
        return favor
      },
        async removeFavor(context, {favorId}){
        const msg = await favorService.remove(favorId)
        context.commit({type: 'removeFavor', favorId});
        return msg
      },
        async saveFavor(context, {favor}){
        const isEdit = !!favor._id;
        const savedFavor = await favorService.save(favor)
        context.commit({
          type: (isEdit)? 'updateFavor' : 'addFavor', 
          favor: savedFavor
        })
        return savedFavor
      }
    },
}