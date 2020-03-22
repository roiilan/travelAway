var locs = [{ lat: 32.0749831, lng: 34.9120554 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve(locs);
        }, 2000)
    });
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
// async function getPosition() {
//     return await navigator.geolocation.getCurrentPosition()
// }



export const locService = {
    getLocs,
    getPosition,
}