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
                        //- component(:is="activeComponent")
                        account(v-if="isLogged")
                        sign(v-else)
</template>



<script>
import Sign from './components/auth/Sign.vue';
import Account from './components/Account.vue';
import * as API from '~/js/api';

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
        this.$store.dispatch('fetchSmsApi');
        this.$store.dispatch('fetchUser');
    }
}
</script>