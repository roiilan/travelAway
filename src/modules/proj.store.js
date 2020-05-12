import { projService } from '../services/proj.service.js'
import {utilService} from '../services/util.service.js'
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

            currProj(state){
            return state.proj
          },
          countries(state){
            let countriesArr = [];
            state.projs.forEach(proj => {
              !countriesArr.includes(proj.position.country)
                ? countriesArr.push(proj.position.country)
                : "";
            });
            return countriesArr.length;
          },


    },
    actions: {
        async loadProjs(context, { filterBy, limit }) {
            console.log(filterBy);
            
            const isLimit = !!limit
            const projs = await projService.query(filterBy, limit)
            if (!isLimit) {
                context.commit({ type: 'setProjs', projs })            
            }
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
            return filteredProjsHeader;
        },
        async getProjById(context, { id }) {
            const proj = await projService.getById(id)
            return proj;
        }
    },
}