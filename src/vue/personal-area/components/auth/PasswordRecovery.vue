<template lang="pug">
    //- .password-recovery
    .sign-in
        .sign-in__wrapper
            .sign-in__title вход   
            .sign-in__subtitle забыли пароль?

            transition(name="fade", mode="out-in")

                form.sign-in__form(
                    :key="step"
                    v-if="step == 'phone'"
                    @submit.prevent="sendPhone"
                )
                    .sign-in__text Пожалуйста, укажите номер телефона, который вы использовали для входа на сайт
                    phone-input(
                        v-model="phone"
                        @focus="errors.phone = false"
                        :isError="errors.phone !== false"
                    )
                    button.button(
                        type="submit"
                    ) отправить


                form.sign-in__form(
                    :key="step"
                    v-if="step == 'code'"
                    @submit.prevent="sendCode"
                )
                    .sign-in__text Вам на телефон прийдет сообщение с кодом, пожалуйста, введите его в окошко
                    input.form-input(
                        type="text"
                        placeholder="Код из сообщения"
                        v-model="code"
                        v-focus
                        @focus="errors.code = false"
                        :class="{ error: errors.code !== false }"
                    )
                    button.button(
                        type="submit"
                    ) отправить


                form.sign-in__form(
                    :key="step"
                    v-if="step == 'newPassword'"
                    @submit.prevent="sendPassword"
                )
                    .sign-in__text Пожалуйста, придумайте новый пароль
                    input.form-input(
                        type="password"
                        placeholder="Новый пароль"
                        v-model="newPassword"
                        v-focus
                        @focus="errors.passwords = false"
                        :class="{ error: errors.passwords !== false }"
                    )
                    input.form-input(
                        type="password"
                        placeholder="Повторите новый пароль"
                        v-model="newPasswordRepeat"
                        @focus="errors.passwords = false"
                        :class="{ error: errors.passwords !== false }"
                    )
                    button.button(
                        type="submit"
                    ) отправить

</template>


<script>

import PhoneInput from './PhoneInput.vue';

import * as api from '../../../../js/api';

export default {
    components: {
        PhoneInput
    },

    data() {
        return {
            steps: ['phone', 'code', 'newPassword'],
            stepIndex: 0,
            // step: 'phone',

            phone: '',
            code: '',
            newPassword: '',
            newPasswordRepeat: '',

            errors: {
                phone: false,
                code: false,
                passwords: false
            }            
        }
    },

    methods: {
        validate(field) {
            switch (field) {
                case 'phone': if ( this.phone.length != 11 ) this.errors.phone = 'Введите номер телефона полностью';
                    break;
                case 'code': if ( this.code.length == 0 ) this.errors.code = 'Введите код из СМС';
                    break;
                case 'newPassword': if ( !this.newPassword.length || this.newPassword !== this.newPasswordRepeat ) this.errors.passwords = 'Пароли должны совпадать';
            }
        },

        sendPhone() {
            this.validate(this.step);
            if ( this.errors.phone !== false ) return;

            api.passwordRecovery.sendPhone();
            this.nextStep();
        },
        sendCode() {
            this.validate(this.step);
            if ( this.errors.code !== false ) return;

            api.passwordRecovery.sendCode();
            this.nextStep();
        },
        sendPassword() {
            this.validate(this.step);
            if ( this.errors.passwords !== false ) return;

            api.passwordRecovery.sendNewPassword();
        },

        nextStep() {
            this.stepIndex++;
        },

        prevStep() {
            this.stepIndex--;            
        }
    },

    computed: {
        step() {
            return this.steps[this.stepIndex];
        },
    }
    
}
</script>

<style lang="scss">

.fade-enter {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
}
.fade-enter-to {
    opacity: 1;
}
.fade-leave-to  {
    opacity: 0;
}
</style>