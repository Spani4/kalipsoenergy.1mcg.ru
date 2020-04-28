<template lang="pug">
    .container
        sign-up(
            v-if="registered === false"
        )
        sign-in(
            v-else
            @switchToSignUp="registered = false"    
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
            registered: null,
        }
    },

    methods: {
        test() {
            console.log('test');
        }
    }
}
</script>