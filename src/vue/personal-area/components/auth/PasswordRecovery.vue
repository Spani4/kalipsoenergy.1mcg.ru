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
                    div
                        .sign-in__mini-btn(
                            @click.prevent="nextStep"
                        ) Уже получили код?
                    button.button(
                        type="submit"
                        :class="{ pending }"
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
                    div
                        .sign-in__mini-btn(
                            @click.prevent="prevStep"
                        ) Ввести номер телефона заново?                    
                    button.button(
                        type="submit"
                        :class="{ pending }"
                    ) отправить


                form.sign-in__form(
                    :key="step"
                    v-if="step == 'newPassword'"
                    @submit.prevent="sendNewPassword"
                )
                    .sign-in__text Пожалуйста, придумайте новый пароль
                    .sign-in__text Длина пароля должна составлять от 6 до 20 символов
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
                        :class="{ pending }"
                    ) отправить

                    .errors(style="margin-top: 0")
                        p(v-if="errors.passwords") {{ errors.passwords }}

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
            steps: ['phone', 'code', 'newPassword'],
            stepIndex: 0,

            phone: '',
            code: '',
            newPassword: '',
            newPasswordRepeat: '',

            pending: false,

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
                case 'code': {
                    if ( this.code.length == 0 ) this.errors.code = 'Введите код из СМС';
                    if ( this.code.length > 20 ) this.errors.code = 'Не корректный код';
                }
                    break;
                case 'newPassword': {
                    if ( this.newPassword !== this.newPasswordRepeat ) {
                        this.errors.passwords = 'Пароли должны совпадать';
                    } else if ( this.newPassword.length < 6 || this.newPassword.length > 20 ) {
                        this.errors.passwords = 'Длина пароля должна составлять от 6 до 20 символов';
                    }
                }
            }
        },

        sendPhone() {

            this.validate(this.step);
            if ( this.errors.phone !== false ) return;

            const data = { phone: this.phone };
            this.pending = true;

            API.recovery.sendPhone(data, 'recovery-jwt')
                .then(jwt => {
                    this.nextStep();
                }).catch(error => {
                    if (error.exception) this.$noty('error', error.exception);                  
                }).finally(() => {
                    this.pending = false;
                });    
        },

        sendCode() {

            this.validate(this.step);
            if ( this.errors.code !== false ) return;

            const data = { code: this.code };
            this.pending = true;

            API.recovery.sendSmsCode(data, 'recovery-jwt')
                .then(jwt => {
                    this.nextStep();
                }).catch(error => {
                    if (error.exception) this.$noty('error', error.exception);                  
                }).finally(() => {
                    this.pending = false;
                });            
        },

        sendNewPassword() {

            this.validate(this.step);
            if ( this.errors.passwords !== false ) return;

            const data = { password: this.newPassword };
            this.pending = true;

            API.recovery.sendNewPassword(data, 'recovery-jwt')
                .then(jwt => {
                    this.$emit('success');
                    this.resetSteps();
                }).catch(error => {
                    if (error.exception) this.$noty('error', error.exception);                  
                }).finally(() => {
                    this.pending = false;
                });              

       
        },

        nextStep() { this.stepIndex++ },
        prevStep() { this.stepIndex-- },
        resetSteps() { this.stepIndex = 0 },
    },

    computed: {
        step() {
            return this.steps[this.stepIndex];
        },
    }
    
}
</script>