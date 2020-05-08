import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '../js/api';
import showNoty from '../js/utils/showNoty';


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        siteKey: '',
        user: null,
    },

    actions: {
        fetchUser({ commit }) {
            api.fetchUser()
                .then(response => {
                    commit('setUser', response.data);
                }).catch(error => { 
                    if (error.exception) showNoty('error', error.exception);    
                });
        },
    },

    mutations: {
        setSiteKey(state, siteKey) {
            state.siteKey = siteKey;
        },

        setUser(state, user) {
            state.user = user;
        }
    }
})