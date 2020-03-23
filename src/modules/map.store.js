// import { projService } from '../services/proj.service.js'
import mapService from '../services/map.service.js'


export default {
    state: {
        currPosition: {},
    },
   
    getters: {        
        // currPosition(state, { projs }) {
        //     state.currPosition = projs
        // },
    },
    actions: {
        async searchPosition(context, { txt }) {
            console.log('store', txt)
            const getPosition = await mapService.searchPosition(txt)
                // context.commit({ type: 'currPosition', getPosition });
            return getPosition;
        }
    },
}
