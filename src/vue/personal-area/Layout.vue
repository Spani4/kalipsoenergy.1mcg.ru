<template lang="pug">
    .personal-area(v-if="$root.show")
        .wrapper 
            .personal-area__window
                .personal-area__head личный кабинет&nbsp;&nbsp;&nbsp;
                    button.personal-area__close-btn(
                        @click="$root.toggle"
                    ) &times;
                .personal-area__body
                    component(:is="activeComponent")
</template>



<script>
import Sign from './components/auth/Sign.vue';
import * as api from '../../js/api';

export default {

    components: {
        Sign,
    },

    data() {
        return {
            activeComponent: null,
        }
    },

    created() {
        const token = localStorage.getItem('jwt');

        if ( !token ) {
            this.activeComponent = 'sign';

            api.getSmsApi()
                .then(data => {
                    this.$store.commit('setSiteKey', data.siteKey);
                });
        }
    }


}
</script>