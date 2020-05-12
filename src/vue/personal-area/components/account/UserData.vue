<template lang="pug">
    .user-data
        .user-data__data-group
            .user-data__item.name {{ userFullName }}
            .user-data__contacts
                .user-data__item {{ getFormattedPhone(user.phone) }}
                .user-data__item(v-if="userProps.email") {{ userProps.email }}
                .user-data__item(v-if="userProps.additionalPhone") {{ getFormattedPhone(userProps.additionalPhone) }}
            template(v-if="isOrganization")
                .user-data__item(v-if="userProps.organization") {{ userProps.organization }}
                .user-data__item(v-if="userProps.inn") ИНН: {{ userProps.inn }}
                .user-data__item(v-if="userProps.ogrn") ОГРН: {{ userProps.ogrn }}
            template(v-else)
                .user-data__item(v-if="userProps.snils") СНИЛС: {{ userProps.snils }}
            .user-data__item(v-if="userProps.region") {{ fullAddress }}
            //- .user-data__item(v-if="userProps.region") {{ userProps.region }}
            //- .user-data__item(v-if="userProps.city") {{ userProps.city }}
            //- .user-data__item(v-if="userProps.address") {{ userProps.address }}
            
        
</template>

<script>
export default {

    methods: {
        getFormattedPhone(phone) {
            const p = phone;

            return `+${p[0]} ${p[1]+p[2]+p[3]} ${p[4]+p[5]+p[6]} ${p[7]+p[8]+p[9]+p[10]}`;
        }
    },
    
    computed: {
        user() {
            return this.$store.state.user;
        },
        userProps() {
            return this.user._embedded.props;
        },
        userFullName() {
            const surname = this.userProps.surname ? this.userProps.surname : '';
            const name = this.userProps.name ? this.userProps.name : '';
            const patronimic = this.userProps.patronimic ? this.userProps.patronimic : '';

            return `${surname} ${name} ${patronimic}`;
        },
        fullAddress() {
            const region = this.userProps.region ? this.userProps.region : '';
            const city = this.userProps.city ? this.userProps.city : '';
            const address = this.userProps.address ? this.userProps.address : '';

            return `${region} ${region.length ? ', ' : ''}${city} ${city.length ? ', ' : ''}${address}`;
        },
        isOrganization() {
            return this.user.category !== "Физическое лицо"
        }

    }
}
</script>
