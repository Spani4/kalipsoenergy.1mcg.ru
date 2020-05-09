import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '~/js/api';
import noty from '~/js/components/noty';


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        siteKey: '',
        user: null,
    },

    actions: {
        fetchUser({ commit }) {
            api.fetchUser()
                .then(user => {
                    commit('setUser', user);
                }).catch(error => { 
                    if (error.exception) noty('error', error.exception);    
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