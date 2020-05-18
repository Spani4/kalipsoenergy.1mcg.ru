<template lang="pug">
    .user-nav
        .user-nav__item(
            @click="goTo('my-data')"
            :class="{ active: activeComponent == 'my-data' }"
        ) мои данные
        .user-nav__item(
            @click="goTo('download-forms')"
            :class="{ active: activeComponent == 'download-forms' }"
        ) скачать формы документов
        .user-nav__item(
            @click="goTo('connection-application')"
            :class="{ active: activeComponent == 'connection-application' }"
        ) заявка на технологическое присоединение
        .user-nav__item(
            @click="goTo('send-indications')"
            :class="{ active: activeComponent == 'send-indications' }"
        ) передать показания приборов учета
        .user-nav__item(
            @click="goTo('payment')"
            :class="{ active: activeComponent == 'payment' }"
        ) оплатить
        .user-nav__item(
            @click="goTo('change-user-data')"
            :class="{ active: activeComponent == 'change-user-data' }"
        ) направить обращение
        .user-nav__item(@click="logout") выход
</template>

<script>
export default {
    props: {
        goTo: Function,
        activeComponent: String,
    },
    
    methods: {
        logout() {
            localStorage.removeItem('jwt');

            const a = document.createElement('a');
            a.href = document.location.origin;
            a.click();
        }
    },
}
</script>