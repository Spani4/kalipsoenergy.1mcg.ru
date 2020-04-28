<template lang="pug">
    .sign-in
        .sign-in__wrapper
            .sign-in__title вход
            form.sign-in__form
                input.form-input(
                    type="text"
                    placeholder="Логин (Мобильный телефон)"
                )
                input.form-input(
                    type="password"
                    placeholder="Пароль"
                )
                .sign-in__form-row
                    button.button(
                        type="button"
                    ) войти
                    a.sign-in__passord-recovery-btn(href="#"
                        @click.prevent=""
                    ) Забыли пароль?
        
        
</template>

<script>
export default {
    
}
</script>