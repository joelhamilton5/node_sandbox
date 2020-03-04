import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        endpoint: process.env.VUE_APP_API_ENDPOINT
    },
    mutations: {},
    actions: {},
    modules: {}
});
