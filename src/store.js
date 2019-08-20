import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex);


export const store = new Vuex.Store({
    state:{
        isDark: true,
    },
    mutations:{
        toggleDarkMode(state){
            state.isDark = !state.isDark;
        }
    }


});