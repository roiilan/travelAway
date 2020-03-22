// import mapService from './map.service.js'

import Axios from 'axios';
var axios = Axios.create({
    // withCredentials: true
});

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

function getLatLong(txt){
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt.split(" ").join('+')}&key=AIzaSyC78ilnhS4Ey5k2TImLGPdWYV6eYsBhoEo`)
    .then(res => res.data.results[0].geometry.location)
}

export const locService = {
    getLocs,
    getPosition,
    getLatLong
}