<template lang="pug">
    .personal-area(v-if="$root.show")
        .wrapper 
            .personal-area__window

                .personal-area__head личный кабинет&nbsp;&nbsp;&nbsp;
                    button.personal-area__close-btn(
                        @click="$root.toggle"
                    ) &times;
                .personal-area__body
                    transition(name="fade", mode="out-in")
                        account(v-if="isLogged")
                        auth(v-else)
</template>



<script>
import Auth from './components/auth/Index.vue';
import Account from './components/account/Index.vue';
import * as API from '~/js/api';

export default {

    components: {
        Auth,
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
        this.$store.dispatch('fetchSmsApi');
        this.$store.dispatch('fetchUser');
    }
}
</script>