<template lang="pug">
    .sign-up
        .sign-up__wrapper
            .sign-up__title регистрация
            
            form.sign-up__form(
                @submit.prevent=""
            )
                .sign-up__form-group
                    phone-input(
                        v-model="phone"
                        @focus="errors.phone = false"
                        :isError="errors.phone !== false"
                    )
                    input.form-input(
                        type="password"
                        placeholder="Пароль (не менее 6 символов)"
                        v-model="password"
                    )
                    input.form-input(
                        type="password"
                        placeholder="Подтверждение пароля"
                        v-model="password"
                    )
                    input.form-input(
                        type="email"
                        placeholder="E-mail"
                        v-model="email"
                    )
                    phone-input(
                        v-model="additionalPhone"
                        @focus="errors.phone = false"
                        :isError="errors.phone !== false"
                        :placeholder="'Дополнительный телефон'"
                    )

                .sign-up__form-group
                    input.form-input(
                        type="text"
                        placeholder="Область/регион"
                        v-model="region"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Город"
                        v-model="city"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Адрес (улица и дом)"
                        v-model="address"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Фамилия"
                        v-model="surname"
                    )
                    input.form-input(
                        type="text"
                        placeholder="Имя"
                        v-model="name"
                    )

                .sign-up__form-group
                    .sign-up__form-group-title Категория
                    label.sign-up__category(
                        v-for="item in categories"
                    )
                        input.sign-up__radio(
                            type="radio"
                            :value="item"
                            v-model="category"
                        )
                        .sign-up__custom-radio
                        span {{ item }}     
                    input.form-input(
                        type="text"
                        placeholder="Введите код из сообщения"
                    )                   

                .sign-up__form-group
                    input.form-input(
                        type="text"
                        placeholder="Отчество"
                        :key="'отчество'"
                        v-model="patronimic"
                    )                    
                    transition(name="fade", mode="out-in")
                        input.form-input(
                            type="text"
                            placeholder="СНИЛС"
                            :key="'снилс'"
                            v-if="category == 'Физическое лицо'"
                            v-model="snils"
                        )
                        div(
                            :key="'юридическое лицо'"
                            v-else
                        )                    
                            input.form-input(
                                type="text"
                                placeholder="Название организации"
                                v-model="organization"
                            )                    
                            input.form-input(
                                type="text"
                                placeholder="ИНН"
                                v-if="category != 'Физическое лицо'"
                            )                    
                            input.form-input(
                                type="text"
                                placeholder="ОГРН"
                                v-if="category != 'Физическое лицо'"
                            )                    


                .sign-up__form-group
                    label.sign-up__agree
                        input.sign-up_agree-checkbox(
                            type="checkbox"
                        )
                        span Я даю согласие на обработку персональных данных и принимаю 
                        | #[a.sign-up__link(href="#") Политику конфиденциональности]
                    transition(name="fade", mode="out-in")
                        button.button(
                            type="submit"
                            v-if="codeSent"
                        ) зарегистрироваться
                        button.button(
                            type="submit"
                            v-else
                        ) отправить данные

</template>

<script>
import PhoneInput from './PhoneInput.vue';

export default {
    
    components: {
        PhoneInput,
    },

    data() {
        return {
            phone: '',
            email: '',
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

            categories: [
                'Физическое лицо',
                'Юридическое лицо',
                'Индивидуальный предприниматель'
            ],
            category: 'Физическое лицо',

            agree: '',
            codeSent: false,

            errors: {
                phone: false,
            }
        }
    },
}
</script>


<style lang="scss" scoped>
.fade-enter {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .1s;
}
.fade-enter-to {
    opacity: 1;
}
.fade-leave-to  {
    opacity: 0;
}
</style>