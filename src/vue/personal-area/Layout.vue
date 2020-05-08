<template lang="pug">
    .personal-area(v-if="$root.show")
        .wrapper 
            .personal-area__window
                .personal-area__head личный кабинет&nbsp;&nbsp;&nbsp;
                    button.personal-area__close-btn(
                        @click="$root.toggle"
                    ) &times;
                .personal-area__body
                    //- component(:is="activeComponent")
                    account(v-if="isLogged")
                    sign(v-else)
</template>



<script>
import Sign from './components/auth/Sign.vue';
import Account from './components/Account.vue';
import * as api from '../../js/api';

export default {

    components: {
        Sign,
        Account,
    },

    data() {
        return {
            activeComponent: null,
        }
    },

    computed: {
        isLogged() {
            return this.$store.state.user !== null;
        }
    },

    created() {

        api.fetchSmsApi()
            .then(data => {
                this.$store.commit('setSiteKey', data.siteKey);
            }).catch(error => { 
                if (error.exception) this.$noty('error', error.exception);                  
            });

        
        const tokenJson = localStorage.getItem('jwt');
        if ( !tokenJson ) return
        
        const token = JSON.parse(tokenJson);

        if ( !token.accessToken ) {
            localStorage.removeItem('jwt');
        } else {
            this.$store.dispatch('fetchUser');
        }
    }


}
</script>