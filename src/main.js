import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// style
import "./styles/global.scss";


//google maps
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAfOgP37XV4mv6RcyxIwOk1ajVevIhN2TM',
    libraries: 'places',
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
