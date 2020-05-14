<template lang="pug">
    .account 
        .account__sidebar
            .account__user-data
                user-data
            .account__nav
                user-nav(
                    :goTo="setActiveComponent"
                    :active="activeComponent"
                    )
        .account__content
            transition(name="fade" mode="out-in")
                component(:is="activeComponent")
        //- change-user-data
</template>

<script>
import UserData from './UserData.vue';
import UserNav from './UserNav.vue';
import Account from './Index.vue';
import MyData from './MyData.vue';
import DownloadsForms from './DownloadsForms.vue';
import ConnectionApplication from './ConnectionApplication.vue';
import SendIndications from './SendIndications.vue';
import Payment from './Payment.vue';
import ChangeUserData from './ChangeUserData.vue';

export default {

    components: {
        UserData,
        UserNav,
        Account,
        MyData,
        DownloadsForms,
        ConnectionApplication,
        SendIndications,
        Payment,
        ChangeUserData
    },

    data() {
        return {
            activeComponent: '',
            contentComponents: ['my-data', 'download-forms', 'connection-application',
                'send-indications', 'payment', 'change-user-data'],
            
        }
    },

    methods: {
        setActiveComponent(component) {
            this.activeComponent = component;
        },
    }
    
}
</script>
