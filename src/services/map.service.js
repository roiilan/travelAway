const GAPI_KEY = 'AIzaSyC78ilnhS4Ey5k2TImLGPdWYV6eYsBhoEo';
// const GAPI_KEY = 'AIzaSyAfOgP37XV4mv6RcyxIwOk1ajVevIhN2TM'; 

export default {
    searchPosition,
    getPosition,
    GAPI_KEY
}

import axios from "axios";

async function searchPosition(txt){
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=${GAPI_KEY}&language=en&region=US`,'mapService ',txt, )
    const res= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=${GAPI_KEY}&language=en&region=US`)
             
    try { 
        var position=res.data.results[0].geometry.location ;
        const address_components_Length =res.data.results[0].address_components.length;   
        var results=res.data.results[0].address_components;

for (var i=0;i<address_components_Length;i++){
    for (var j=0;j<results[i].types.length;j++){
        if(results[i].types[j]==='country'){
            var country=results[i].long_name;
            var short_country =results[i].short_name; //short name country          
        }   
        if(results[i].types[j]==='locality'){
            var city=results[i].long_name;
            // var shortCity =results[i].short_name; //short name city   
        }   
        
        if(results[i].types[j]==='administrative_area_level_1')
        {
            var region=results[i].long_name;                    
        }   

    }
}        
        position.country=country;
        position.short_country=short_country;
        position.city=city;
        position.region=region;
        console.log(position)
         return position    
           
      }
      catch(error) {
         console.error('Address not found' );       
      }
    }


// FOR USER
function getPosition() {
    return new Promise((resolve, reject) => {
        console.log('resolve: ', resolve);
        console.log('reject: ', reject);
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}





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