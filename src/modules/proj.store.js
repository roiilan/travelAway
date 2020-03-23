import { projService } from '../services/proj.service.js'
import mapService from '../services/map.service.js'


export default {
    state: {
        projs: [],
        // currProj: null
    },
    mutations: {
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
        }
    },
    getters: {
        projs(state) {
            return state.projs
        },

        //     currProj(state){
        //     return state.proj
        //   }
    },
    actions: {
        async loadProjs(context, {}) {
            const projs = await projService.query()
                // async loadProjs(context, {filterBy}){       
                // const projs = await projService.query(filterBy)
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
        async searchPosition(context, { txt }) {
            console.log('store', txt)
            const getPosition = await mapService.searchPosition(txt)
                // context.commit({ type: 'removeProj', projId });
            return getPosition;
        }
    },
}