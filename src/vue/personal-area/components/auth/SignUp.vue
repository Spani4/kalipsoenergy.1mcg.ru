<template lang="pug">
    .sign-up
        include ../../../../pug/mixins/mixins.pug
        .sign-up__wrapper
            .sign-up__title регистрация
            
            form.sign-up__form(
                @submit.prevent="hasCode ? signUp() : sendPhone()"
            )
                .sign-up__form-group.half
                    div.sign-up__input-wrapper
                        phone-input(
                            v-model="userData.phone"
                            @focus="errors.phone = false"
                            :isError="errors.phone !== false"
                            :isDisabled="isDisabled"
                        )
                        .required(title="Обязательное поле")
                    div.sign-up__input-wrapper
                        input.form-input(
                            type="password"
                            placeholder="Пароль (не менее 6 символов)"
                            :class="{ error: errors.password !== false }"
                            :disabled="isDisabled"
                            v-model="userData.password"
                            @focus="errors.password = false"
                        )
                        .required(title="Обязательное поле")
                    div.sign-up__input-wrapper
                        input.form-input(
                            type="password"
                            placeholder="Подтверждение пароля"
                            :class="{ error: errors.passwordRepeat !== false }"
                            :disabled="isDisabled"
                            v-model="userData.passwordRepeat"
                            @focus="errors.passwordRepeat = false"
                        )
                        .required(title="Обязательное поле")
                    input.form-input(
                        type="email"
                        placeholder="E-mail"
                        :disabled="isDisabled"
                        v-model="userData.email"
                    )
                    //- input.form-input(
                    //-     v-model="userData.additionalPhone"
                    //-     :placeholder="'Дополнительный телефон'"
                    //-     :disabled="isDisabled"
                    //- )
                    phone-input(
                        v-model="userData.additionalPhone"
                        :placeholder="'Дополнительный телефон'"
                        :isDisabled="isDisabled"
                    )

                .sign-up__form-group.half
                    input.form-input(
                        type="text"
                        placeholder="Область/регион"
                        :disabled="isDisabled"
                        v-model="userData.region"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Город"
                        :disabled="isDisabled"
                        v-model="userData.city"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Адрес (улица и дом)"
                        :disabled="isDisabled"
                        v-model="userData.address"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Фамилия"
                        :disabled="isDisabled"
                        v-model="userData.surname"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Имя"
                        :disabled="isDisabled"
                        v-model="userData.name"
                    )

                .sign-up__form-group.half
                    .sign-up__form-group-title Категория
                    label.sign-up__category.custom-radio(
                        v-for="(item, i) in categories"
                        :class="{ disabled: isDisabled }"
                    )
                        input.custom-radio__input(
                            type="radio"
                            :disabled="isDisabled"
                            :value="item"
                            v-model="userData.category"
                        )
                        .custom-radio__fake-input
                        span {{ item }}
                

                .sign-up__form-group.half
                    input.form-input(
                        type="text"
                        placeholder="Отчество"
                        :disabled="isDisabled"
                        :key="'отчество'"
                        v-model="userData.patronimic"
                    )                    
                    transition(name="fade", mode="out-in")
                        snils-input(
                            v-if="userData.category == 'Физическое лицо'"
                            ref="snilsInput"
                            v-model="userData.snils"
                        )                      

                        div(
                            :key="'юридическое лицо'"
                            v-else
                        )                    
                            input.form-input(
                                type="text"
                                placeholder="Название организации"
                                :disabled="isDisabled"
                                v-model="userData.organization"
                            )                    
                            input.form-input(
                                type="text"
                                placeholder="ИНН"
                                :disabled="isDisabled"
                                v-if="userData.category != 'Физическое лицо'"
                                v-model="userData.inn"
                            )                    
                            input.form-input(
                                type="text"
                                placeholder="ОГРН"
                                :disabled="isDisabled"
                                v-if="userData.category != 'Физическое лицо'"
                                v-model="userData.ogrn"
                            )                    


                .sign-up__form-group
                    label.sign-up__agree.custom-checkbox(
                        :class="{ disabled: isDisabled }"
                    )
                        input.custom-checkbox__input(
                            type="checkbox"
                            :disabled="isDisabled"
                            v-model="userData.agree"
                        )
                        .custom-checkbox__fake-input
                            +icon('checkbox')
                        span Я даю согласие на обработку персональных данных и принимаю 
                            |
                            a.sign-up__link(href="#") Политику конфиденциональности
                    .sign-up__text *&nbsp;&nbsp; Поля, обязательные для заполнения
                    .errors
                        transition-group(name="fade", mode="out-in")
                            p(v-if="errors.phone !== false", :key="errors.phone") {{ errors.phone }}
                            p(v-if="errors.password !== false", :key="errors.password") {{ errors.password }}
                            p(v-if="errors.passwordRepeat !== false", :key="errors.passwordRepeat") {{ errors.passwordRepeat }}
                    transition(name="fade", mode="out-in")
                        .sign-up__form-row(v-if="hasCode")
                            input.form-input(
                                type="text"
                                placeholder="Введите код из сообщения"
                                v-model="userData.code"
                                v-focus
                            )   
                            button.button(
                                type="submit"
                                :disabled="!userData.agree"
                                :class="{ pending }"
                            ) зарегистрироваться
                        button.button(
                            type="submit"
                            v-else
                            :class="{ pending }"
                            :disabled="!userData.agree"
                        ) отправить данные


</template>

<script>
import PhoneInput from '~/vue/common-components/PhoneInput.vue';
import SnilsInput from '~/vue/common-components/SnilsInput.vue';

import * as API from '~/js/api';

export default {
    
    components: {
        PhoneInput,
        SnilsInput,
    },

    data() {
        return {

            userData: {
                phone: '',
                password: '',
                passwordRepeat: '',
                email: '',
                additionalPhone: '',
                region: '',
                city: '',
                address: '',
                name: '',
                surname: '',
                patronimic: '',
                organization: '',
                snils: '',
                inn: '',
                ogrn: '',
                category: 'Физическое лицо',
                agree: false,
                code: ''
            },

            categories: [
                'Физическое лицо',
                'Юридическое лицо',
                'Индивидуальный предприниматель'
            ],

            hasCode: false,
            pending: false,

            errors: {
                phone: false,
                password: false,
                passwordRepeat: false,
            }
        }
    },

    methods: {

        validate(field) {
            switch (field) {
                case 'phone': if ( this.userData.phone.length != 11 ) this.errors.phone = 'Введите номер телефона полностью';
                    break;
                case 'password': if ( this.userData.password.length < 6 || this.userData.password.length > 20 ) this.errors.password = 'Введите пароль (длина пароля должна составлять от 6 до 20 символов)';
                    break;
                case 'passwordRepeat': if ( this.userData.password !== this.userData.passwordRepeat ) this.errors.passwordRepeat = 'Пароли должны совпадать'
                    break;

                case 'email':
                case 'additionalPhone':
                case 'region':
                case 'city':
                case 'address':
                case 'name':
                case 'surname':
                case 'patronimic':
                case 'snils':
                case 'inn':
                case 'code':
                case 'ogrn': if ( this.userData[field].length > 50) this.userData[field] = this.userData[field].trim().substr(0, 50);
                    break;
                
                case 'organization': if ( this.userData[field].length > 100) this.userData[field] = this.userData[field].trim().substr(0, 100);
                    break;

                case 'agree': if ( this.userData[field] !== true ) this.errors.agree = true;
                    break;
                
                default: return;
            }
        },

        validateAll() {
            const fieldsToValidate = Object.keys(this.userData);

            fieldsToValidate.forEach(field => {
                this.validate(field);
            });

            const isValide = Object.values(this.errors).every(error => error === false)

            return isValide;
        },

        sendPhone() {

            if ( this.pending ) return;

            const isValide = this.validateAll();
            if ( !isValide ) return;

            this.pending = true;

            const data = { phone: this.userData.phone };

            API.auth.sendPhone(data)
                .then(authJwt => {
                    this.hasCode = true;
                }).catch(error => {
                    if (error.exception) {
                        this.$noty('error', error.exception);

                        if ( error.exception != 'Пользователь с таким номером телефона уже существует' )
                            this.hasCode = true;
                    }
                }).finally(() => {
                    this.pending = false;
                });
        },

        signUp() {

            if ( this.pending ) return
            this.pending = true;

            const data = this.collectUserData;

            API.auth.signUp(data)
                .then(jwt => {
                    this.$emit('success');
                }).catch(error => {
                    if (error.exception) this.$noty('error', error.exception);                  
                });

            this.pending = false;
        },

    },

    computed: {
        isDisabled() {
            return this.pending || this.hasCode;
        },

        collectUserData() {
            const data = {};
            for ( let key in this.userData ) {
                if ( this.userData[key] === '' ) continue;
                if ( key === 'passwordRepeat' ) continue;
                data[key] = this.userData[key];
            }
            return data;
        }
    }
    
}
</script>