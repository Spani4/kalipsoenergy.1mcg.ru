<template lang="pug">
    .user-nav
        .user-nav__item мои данные
        .user-nav__item скачать формы документов
        .user-nav__item заявка на технологическое присоединение
        .user-nav__item передать показания приборов учета
        .user-nav__item оплатить
        .user-nav__item направить обращение
        .user-nav__item(@click="logout") выход
</template>

<script>
export default {
    props: {
        goTo: Function,
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