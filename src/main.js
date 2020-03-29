import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
// import { Settings } from 'luxon'

// Settings.defaultLocale = 'he'
Vue.use(Datetime)
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })


Vue.component('datetime', Datetime);



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