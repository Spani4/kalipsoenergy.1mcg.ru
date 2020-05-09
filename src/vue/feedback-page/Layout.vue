<template lang="pug">
    form.feedback-page__form(
        @submit.prevent="send"
    )
        include ../../pug/mixins/mixins.pug
        .feedback-page__row
            div.feedback-page__input-wrapper
                input.form-input(
                    type="text"
                    placeholder="Фамилия Имя"
                    v-model="formData.name"
                    @focus="errors.name = false"
                )
                .required(title="Обязательное поле")    

            .feedback-page__input-wrapper
                input.form-input(
                    type="email"
                    placeholder="E-mail"
                    v-model="formData.email"
                    @focus="errors.email = false"
                )
                .required(title="Обязательное поле")

        .feedback-page__row
            div.feedback-page__input-wrapper
                input.form-input(
                    type="text"
                    placeholder="Название органзации"
                    v-model="formData.organization"
                )

            .feedback-page__input-wrapper
                phone-input(
                    v-model="formData.phone"
                    :isError="errors.phone !== false"
                    @focus="errors.phone = false"
                    :placeholder="'Контактный телефон'"
                )
                .required(title="Обязательное поле")

        textarea.form-textarea

        .feedback-page__text *&nbsp;&nbsp; Поля, обязательные для заполнения
       
        label.feedback-page__agree.custom-checkbox
            input.custom-checkbox__input(
                type="checkbox"
                v-model="formData.agree"
            )
            .custom-checkbox__fake-input
                +icon('checkbox')
            span Я даю согласие на обработку персональных данных и принимаю 
                |
                a.feedback-page__link(href="#") Политику конфиденциональности

        button.button(
            type="submit"
            :class="{ pending }"
            :disabled="!formData.agree"
        ) отправить


</template>

<script>
import PhoneInput from '~/vue/common-components/PhoneInput.vue';

export default {
    components: {
        PhoneInput,
    },

    data() {
        return {
            formData: {
                name: '',
                phone: '',
                email: '',
                organization: '',
                message: '',
                agree: false,
            },

            errors: {
                name: false,
                phone: false,
                email: false,
                message: false,
            },

            pending: false,
        }
    },

    methods: {
        sendFeedback() {
            this.name = '';
            this.phone = '';
            this.email = '';
            this.organization = '';
            this.message = '';
        },
    },

    computed: {}
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