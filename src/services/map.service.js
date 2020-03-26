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
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=${GAPI_KEY}`,'mapService ',txt, )
    // const res= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=${GAPI_KEY}`)
         
    try { 
        var position=res.data.results[0].geometry.location ;
        const address_components_Length =res.data.results[0].address_components.length;     
        // var country=res.data.results[0].address_components[address_components_Length-1].long_name;      
        // var city=res.data.results[0].address_components[address_components_Length-3].long_name;          
        // var country=res.data.results[0].address_components.map(x => x * 2);

        var results=res.data.results[0].address_components;

      

for (var i=0;i<address_components_Length;i++){
    // console.log(i)
    // console.log(results[i].types)

    for (var j=0;j<results[i].types.length;j++){
        // console.log(results[i].types[j])
        if(results[i].types[j]==='country'){
            // console.log(results[i].long_name)
            var country=results[i].long_name;
            var short_country =results[i].short_name; //short name country          
            // console.log(short_country)

        }

        if(results[i].types[j]= "administrative_area_level_1"){
        var region =results[i].long_name;
    }
    
    // if(results[i].types[j]="administrative_area_level_1")
    // if(res.data.results[i].address_components[j].types[0] == "administrative_area_level_1")
    // var region =results[i].long_name;
    // console.log(results[j].address_components[i])
    // console.log(results[i].types[j]="administrative_area_level_1")
}
console.log(region)
}

        
// console.log(results,'results')                
        //  console.log(position)
        //  console.log(country)
        //  console.log(city)
         return position    
            // }
      }
      catch(error) {
         console.error('Address not found' );
       
      }

async function searchPosition(txt) {
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=${GAPI_KEY}`, 'mapService ', txt, )
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=${GAPI_KEY}`)

    //    .then(res => res.data.results[0].geometry.location)
    //    .catch(err=>console.log(err,'err'))
    try {
        var position = res.data.results[0].geometry.location
        return position
    } catch (error) {
        console.error('Address not found');

    }
}




function codeLatLng(lat, lng) {
    console('codeLatLng',lat,lng)
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results,'results');
        if (results[1]) {
        var indice=0;
        for (var j=0; j<results.length; j++)
        {
            if (results[j].types[0]=='locality')
                {
                    indice=j;
                    break;
                }
            }
        alert('The good number is: '+j);
        console.log(results[j]);
        for (var i=0; i<results[j].address_components.length; i++)
            {
                if (results[j].address_components[i].types[0] == "locality") {
                        //this is the object you are looking for City
                        city = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                        //this is the object you are looking for State
                        region = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "country") {
                        //this is the object you are looking for
                        country = results[j].address_components[i];
                    }
            }

            //city data
            alert(city.long_name + " || " + region.long_name + " || " + country.short_name)


            } else {
              alert("No results found");
            }
        //}
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
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