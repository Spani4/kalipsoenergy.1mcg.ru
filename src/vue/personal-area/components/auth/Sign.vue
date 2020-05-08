<template lang="pug">

    transition(name="fade", mode="out-in")

        sign-up(
            v-if="registered === false"
            @success=""
        )

        sign-in(
            v-if="!passwordLost && registered"
            @switchToSignUp="registered = false"
            @switchToPassowrdRecovery="passwordLost = true"
            @success=""
        )

        password-recovery(
            v-if="passwordLost"
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

    methods: {
        test() {
            console.log('test');
        }
    }
}
</script>


<style lang="scss" scoped>
.fade-enter {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
}
.fade-enter-to {
    opacity: 1;
}
.fade-leave-to  {
    opacity: 0;
}
</style>