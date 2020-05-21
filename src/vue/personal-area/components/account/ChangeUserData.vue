<template lang="pug">
    .sign-up
        include ../../../../pug/mixins/mixins.pug
        .sign-up__wrapper

            .sign-up__title изменение данных
            
            form.sign-up__form(
                @submit.prevent="sendData"
                )
                .sign-up__form-group.half
                    div.sign-up__input-wrapper
                        phone-input(
                            ref="phoneInput"
                            v-model="userData.phone"
                            @focus="errors.phone = false"
                            :isError="errors.phone !== false"
                            :isDisabled="true"
                        )
                        //- .required(title="Обязательное поле")
                    div.sign-up__input-wrapper
                        input.form-input(
                            type="password"
                            placeholder="Новый пароль (не менее 6 символов)"
                            :class="{ error: errors.password !== false }"
                            :disabled="isDisabled"
                            v-model="userData.password"
                            @focus="errors.password = false"
                        )
                    transition(name="fade")
                        div.sign-up__input-wrapper(
                            v-if="userData.password.length"
                        )
                            input.form-input(
                                type="password"
                                placeholder="Подтверждение пароля"
                                :class="{ error: errors.passwordRepeat !== false }"
                                :disabled="isDisabled"
                                v-model="userData.passwordRepeat"
                                @focus="errors.passwordRepeat = false"
                            )
                    input.form-input(
                        type="email"
                        placeholder="E-mail"
                        :disabled="isDisabled"
                        v-model="userData.email"
                    )

                    phone-input(
                        ref="additionalPhoneInput"
                        :placeholder="'Дополнительный телефон'"
                        v-model="userData.additionalPhone"
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
                    button.button(
                        type="button"
                        @click="$emit('return')"
                    ) отмена
                .sign-up__form-group
                    button.button(
                        type="submit"
                        :class="{ pending }"
                    ) изменить данные

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
            },

            categories: [
                'Физическое лицо',
                'Юридическое лицо',
                'Индивидуальный предприниматель'
            ],

            pending: false,

            errors: {
                phone: false,
                password: false,
                passwordRepeat: false,
            }
        }
    },

    methods: {

        validateField(field) {
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
                
                default: return;
            }
        },

        validateData(data) {

            const fieldsToValidate = data ? Object.keys(data) : Object.keys(this.userData);

            fieldsToValidate.forEach(field => {

                if ( this.userData[field] === undefined ) return;
                if ( field == 'password' && this.userData.password.length == 0) return;
                if ( field == 'passwordRepeat' && this.userData.password.length == 0) return;

                this.validateField(field);
            });

            const isValide = Object.values(this.errors).every(error => error === false)
            return isValide;
        },

        sendData() {

            if ( this.pending ) return

            const data = this.collectUserData;
            const isValide = this.validateData(data);

            if ( !isValide ) return;

            this.pending = true;

            this.$store.dispatch('updateUser', data);

            this.pending = false;
        },

        setFields() {
            const user = this.user;
            const props = user._embedded.props;

            this.userData.phone = user.phone;
            this.userData.email = user.email;
            this.userData.category = user.category;

            for ( let key in props ) {
                this.userData[key] = props[key];
            }

            this.$refs.phoneInput.forceValue(this.userData.phone);
            this.$refs.additionalPhoneInput.forceValue(this.userData.additionalPhone);
            this.$refs.snilsInput.forceValue(this.userData.snils);
        }        

    },

    computed: {
        isDisabled() {
            return this.pending;
        },

        collectUserData() {

            const data = {};

            for ( let key in this.userData ) {
                if ( this.userData[key] === '' && key == 'email') continue;
                if ( this.userData[key] === '' && key == 'password') continue;
                if ( key === 'passwordRepeat' ) continue;
                if ( key === 'phone' ) continue;
                data[key] = this.userData[key];
            }
            return data;
        },

        user() {
            return this.$store.state.user;
        },

        ogrn() {
            return this.userData.ogrn;
        },

        inn() {
            return this.userData.inn;
        }
    },

    watch: {
        user() {
            this.$emit('return');
        },
        inn(newVal, oldVal) {
            let inn = newVal.replace(/\D/g, '');
            this.userData.inn = inn.length <= 12 ? inn : inn.substr(0,12);
        },
        ogrn(newVal, oldVal) {
            let ogrn = newVal.replace(/\D/g, '');
            this.userData.ogrn = ogrn.length <= 13 ? ogrn : ogrn.substr(0,13);
        }
    },

    mounted() {
        this.setFields();
    }
}
</script>