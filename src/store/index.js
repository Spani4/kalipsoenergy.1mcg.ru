import Vue from 'vue';
import Vuex from 'vuex';

import * as API from '~/js/api';
import noty from '~/js/components/noty';


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        siteKey: '',
        user: null,
    },

    actions: {
        fetchSmsApi({ commit }) {
            API.auth.fetchSmsApi()
                .then(data => {
                    commit('setSiteKey', data.siteKey);
                }).catch(error => {
                    if (error.exception) noty('error', error.exception);
                });
        },

        fetchUser({ commit }) {
            API.fetchUser()
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