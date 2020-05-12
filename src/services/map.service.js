const GAPI_KEY = 'AIzaSyBTEWMtjziTWSwBzkhZYC3jc-q2KAXBkkE';
// const GAPI_KEY = 'AIzaSyAfOgP37XV4mv6RcyxIwOk1ajVevIhN2TM'; 

export default {
    searchPosition,
    getPosition,
    GAPI_KEY
}

import axios from "axios";

async function searchPosition(txt){
    console.log(txt);
    
    const res= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=${GAPI_KEY}&language=en&region=US`)
    console.log(res);
    
             
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
        // position.city=city;
        position.region=region;
         return position    
           
      }
      catch(error) {
         console.error('Address not found' );       
      }
    }


// FOR USER
function getPosition() {
    return new Promise((resolve, reject) => {      
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



