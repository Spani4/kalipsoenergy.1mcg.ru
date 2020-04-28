<template lang="pug">
    .container
        sign-in(v-if="step == 'sign-in'")
        sign-up(v-if="step == 'sign-up'")
        
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
            step: 'sign-in',
        }
    },
}
</script>