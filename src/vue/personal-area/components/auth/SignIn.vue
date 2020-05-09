<template lang="pug">
    .sign-in
        .sign-in__wrapper
            .sign-in__title вход
            form.sign-in__form(
                @submit.prevent="signIn"
            )
                phone-input(
                    v-model="phone"
                    @focus="errors.phone = false"
                    @blur="validate('phone')"
                    :isError="errors.phone !== false"
                )
                input.form-input(
                    type="password"
                    placeholder="Пароль"
                    :class="{ error: errors.password !== false }"
                    v-model="password"
                    @focus="errors.password = false"
                )
                .sign-in__form-row
                    button.button(
                        type="submit"
                    ) войти
                    .sign-in__mini-btn(
                        @click.prevent="$emit('switchToPassowrdRecovery')"
                    ) Забыли пароль?
                .errors
                    p(v-if="errors.phone != false") {{ errors.phone }}
                    p(v-if="errors.password != false") {{ errors.password }}

            p.sign-in__sign-up-prompt Впервые на сайте?
            button.button(
                type="button"
                @click="$emit('switchToSignUp')"
            ) зарегистрироваться
            
</template>

<script>
import PhoneInput from '~/vue/common-components/PhoneInput.vue';
import * as API from '~/js/api';

export default {
    components: {
        PhoneInput
    },

    data() {
        return {
            phone: '',
            password: '',

            errors: {
                phone: false,
                password: false
            }
        }
    },

    methods: {
        validate(field) {
            switch (field) {
                case 'phone': if ( this.phone.length != 11 ) this.errors.phone = 'Введите номер телефона полностью';
                    break;
                case 'password': if ( this.password.length == 0 || this.password.length > 20 ) this.errors.password = 'Введите пароль';
            }
        },

        signIn() {
            for ( let key in this.errors ) {
                this.validate(key);
            }

            const errors = Object.values(this.errors);
            const data = {
                phone: this.phone,
                password: this.password
            };

            if ( errors.every(error => error === false)) {
                API.auth.signIn(data)
                    .then(jwt => {
                        this.$emit('success');
                    }).catch(error => {
                        if (error.exception) this.$noty('error', error.exception);                  
                    });
            }
        }
    }
}
</script>