import mapService from '../services/map.service.js'


export default {
    state: {
        currPosition: {},
    },
    actions: {
        async searchPosition(context, { txt }) {
            // console.log('store', txt)
            const getPosition = await mapService.searchPosition(txt)
            if (getPosition) {
                getPosition.txtAddress = txt
                return getPosition;
            }
        }
    },
}