import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        endpoint: "http://localhost:8082", // EXPRESS
        // endpoint: "http://localhost:8081", // KOA
    },
    mutations: {},
    actions: {},
    modules: {}
});
