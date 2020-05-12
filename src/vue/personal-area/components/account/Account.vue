<template lang="pug">
    .account 
        .account__sidebar
            .account__user-data
                user-data
            .account__nav
                user-nav
        .account__content
            component(:is="activeComponent")
</template>

<script>
import UserData from './UserData.vue';
import UserNav from './UserNav.vue';


export default {

    components: {
        UserData,
        UserNav
    },

    data() {
        return {
            activeComponent: '',
        }
    }
    
}
</script>
