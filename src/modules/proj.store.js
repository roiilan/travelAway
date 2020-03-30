import { projService } from '../services/proj.service.js'
import mapService from '../services/map.service.js'


export default {
    state: {
        projs: [],
        filterBy: {
            txt:"",
            // title: "",
            sort: null
        }
    },
    mutations: {
        setFilter(state, {filterBy}){
            console.log('store',filterBy)
            state.filterBy = filterBy 
        },
        setProjs(state, { projs }) {
            state.projs = projs
        },

        setProj(state, { proj }) {
            state.currProj = proj
        },
        addProj(state, { proj }) {
            state.projs.unshift(proj)
        },
        updateProj(state, { proj }) {
            const idx = state.projs.findIndex(currProj => currProj._id === proj._id)
            state.projs.splice(idx, 1, proj)
        },
        removeProj(state, { projId }) {
            const idx = state.projs.findIndex(currProj => currProj._id === projId)
            state.projs.splice(idx, 1)
        },
    },
    getters: {
        projs(state) {
            return state.projs
        },
        filterBy(state){
            return state.filterBy 
               }
    
   
      },
    actions: {
<<<<<<< HEAD
        async loadProjs(context, {filterBy}) {
            console.log(filterBy,'filterBy')
            const projs = await projService.query(filterBy)
=======
        async loadProjs(context, {}) {

            const projs = await projService.query()
            
                // async loadProjs(context, {filterBy}){       
                // const projs = await projService.query(filterBy)
>>>>>>> 59f8e89d82f0a9614a8d7621a7cca6e0456db74f
            context.commit({ type: 'setProjs', projs })
            return projs

        },
 

        async loadProj(context, { projId }) {
            const proj = await projService.getById(projId)
                // context.commit({type: 'setProj', proj})
            return proj
        },
        async removeProj(context, { projId }) {
            const msg = await projService.remove(projId)
            context.commit({ type: 'removeProj', projId });
            return msg
        },
        async saveProj(context, { proj }) {


            const isEdit = !!proj._id;
            const savedProj = await projService.save(proj)
            context.commit({
                type: (isEdit) ? 'updateProj' : 'addProj',
                proj: savedProj
            })
            return savedProj
        },
        async getFilteredProjHeader(context, { filter }) {
            const filteredProjsHeader = await projService.getHeaderObj(filter)
                // context.commit({ type: 'removeProj', projId });

            return filteredProjsHeader;
        }
    },
}