<template lang="pug">

    transition(name="fade", mode="out-in")

        sign-up(
            v-if="registered === false"
            @success="$store.dispatch('fetchUser')"
        )

        sign-in(
            v-if="!passwordLost && registered"
            @switchToSignUp="registered = false"
            @switchToPassowrdRecovery="passwordLost = true"
            @success="$store.dispatch('fetchUser')"
        )

        password-recovery(
            v-if="passwordLost"
            @success="$store.dispatch('fetchUser')"
        )
    
</template>

<script>
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import PasswordRecovery from './PasswordRecovery.vue';

export default {
    
    components: {
        SignIn,
        SignUp,
        PasswordRecovery
    },

    data() {
        return {
            registered: true,
            passwordLost: false,
        }
    },
}
</script>