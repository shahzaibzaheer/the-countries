
import Home from './components/Home.vue';
import country from './components/Country.vue';


export  const routes = [
    { path: '', component: Home, name: "home"},
    { path: '/:name', component: country, name: "countryDetail"},
];