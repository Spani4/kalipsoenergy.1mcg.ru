<template lang="pug">
    .account
        change-user-data(
            v-if="mode == 'edit-data'"
            @return="mode = 'account'"
        )
        template(v-else)
            .account__sidebar
                .account__user-data
                    user-data(
                        @editUserData="mode = 'edit-data'"
                    )
                .account__nav
                    user-nav(
                        :goTo="setActiveComponent"
                        :activeComponent="activeComponent"
                        )
            .account__content
                transition(name="fade" mode="out-in")
                    component(:is="activeComponent")
</template>

<script>
import UserData from './UserData.vue';
import UserNav from './UserNav.vue';
import MyData from './MyData.vue';
import DownloadForms from './DownloadForms.vue';
import ConnectionApplication from './ConnectionApplication.vue';
import SendIndications from './SendIndications.vue';
import Payment from './Payment.vue';
import Feedback from './Feedback.vue';
import ChangeUserData from './ChangeUserData.vue';

export default {

    components: {
        UserData,
        UserNav,
        MyData,
        DownloadForms,
        ConnectionApplication,
        SendIndications,
        Payment,
        Feedback,
        ChangeUserData
    },

    data() {
        return {
            mode: '',
            modes: ['edit-data', 'account'],
            activeComponent: '',
            contentComponents: ['my-data', 'download-forms', 'connection-application',
                'send-indications', 'payment', 'feedback', 'change-user-data'],
            
        }
    },

    methods: {
        setActiveComponent(component) {
            this.activeComponent = component;
        },
    },

    created() {
        // this.activeComponent = 'my-data';
        this.activeComponent = 'download-forms';
        this.mode = 'account';
    }
    
}
</script>
