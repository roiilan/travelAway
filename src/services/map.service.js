const GAPI_KEY = 'AIzaSyC78ilnhS4Ey5k2TImLGPdWYV6eYsBhoEo'; 
// const GAPI_KEY = 'AIzaSyAfOgP37XV4mv6RcyxIwOk1ajVevIhN2TM'; 

export default {
    // initMap,
    // addMarker,
    // panTo,
    // getNameOfLatLng,
    searchPosition,
    GAPI_KEY
}

import axios from "axios";
// var map;


// function getNameOfLatLng(lat, lng){
//         return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GAPI_KEY}`)
//             .then(res => res.data.plus_code.compound_code.substr(res.data.plus_code.compound_code.indexOf(' ')+1));
// }

// function initMap(lat = 32.0749831, lng = 34.9120554) {
//     return _connectGoogleApi()
//         .then(() => {
//             map = new google.maps.Map(
//                 document.querySelector('#map'), {
//                 center: { lat, lng },
//                 zoom: 15
//             })
//         })
// }

// function addMarker(loc, locationName) {
//     var marker = new google.maps.Marker({
//         position: loc,
//         map: map,
//         title: locationName
//     });
//     return marker;
// }

// function panTo(lat, lng) {
//     var laLatLng = new google.maps.LatLng(lat, lng);
//     map.panTo(laLatLng);
// }

// function _connectGoogleApi() {
//     if (window.google) return Promise.resolve()
//     var elGoogleApi = document.createElement('script');
//     elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${GAPI_KEY}`;
//     elGoogleApi.async = true;
//     document.body.append(elGoogleApi);

//     return new Promise((resolve, reject) => {
//         elGoogleApi.onload = resolve;
//         elGoogleApi.onerror = () => reject('Google script failed to load')
//     })
// }



function searchPosition(txt){
     console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=${GAPI_KEY}`,'mapService ',txt, )
          return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=${GAPI_KEY}`)
        .then(res => res.data.results[0].geometry.location)
    // var b='bbbbbbbbbbbbbb'
    //  return b;
}