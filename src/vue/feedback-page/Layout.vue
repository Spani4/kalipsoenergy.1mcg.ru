<template lang="pug">
    form.feedback-page__form
        include ../../pug/mixins/mixins.pug
        .feedback-page__row
            div.feedback-page__input-wrapper
                input.form-input(
                    type="text"
                    placeholder="Фамилия Имя"
                    v-model="formData.name"
                    @focus="errors.name = false"
                    :class="{ error: errors.name !== false }"
                )
                .required(title="Обязательное поле")    

            .feedback-page__input-wrapper
                input.form-input(
                    type="email"
                    placeholder="E-mail"
                    v-model="formData.email"
                    @focus="errors.email = false"
                    :class="{ error: errors.email !== false }"
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

        textarea.form-textarea(
            maxlength="2000"
            v-model="formData.message"
            :class="{ error: errors.message !== false }"
        )

        .feedback-page__text *&nbsp;&nbsp; Поля, обязательные для заполнения
       
        label.feedback-page__agree.custom-checkbox
            input.custom-checkbox__input(
                type="checkbox"
                :isError="errors.message !== false"
                v-model="formData.agree"
            )
            .custom-checkbox__fake-input
                +icon('checkbox')
            span Я даю согласие на обработку персональных данных и принимаю 
                |
                a.feedback-page__link(href="#") Политику конфиденциональности

        button.button(
            type="button"
            :class="{ pending }"
            :disabled="!formData.agree || pending"
            @click="sendFeedback()"
        ) отправить


</template>

<script>
import PhoneInput from '~/vue/common-components/PhoneInput.vue';

export default {
    components: {
        PhoneInput,
    },

    props: {
        service: String,
    },

    data() {
        return {
            type: 'servicePage',

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
        validateField(field) {

            let data = this.formData[field];

            switch (field) {

                case 'name': {
                        if ( !data.length ) this.errors.name = 'Введите имя';
                        if ( data.length > 150 ) this.formData[field] = data.substr(0, 150);
                    };
                    break;

                case 'phone': if ( this.formData.phone.length != 11 ) this.errors.phone = 'Введите номер телефона полностью';
                    break;

                case 'email': {
                        if ( !data.match('^.+@.+\..$') ) this.errors.email = 'Введите email';
                        if ( data.length > 150 ) this.formData[field] = data.substr(0, 150);
                    };
                    break;

                case 'organization': if ( data.length > 200 ) this.formData[field] = data.substr(0, 200);
                    break; 

                case 'message': {
                        if ( !data.length ) this.errors.message = 'Введите сообщение';
                        if ( data.length > 2000 ) this.formData[field] = data.substr(0, 2000);
                    }
                    break;

                default: return;
            }
        },

        validateAll() {
            const fields = Object.keys(this.formData);
            fields.forEach(field => this.validateField(field));
        },

        sendFeedback() {

            this.validateAll();
            if ( !this.isValide ) return;

            this.pending = true;

            const data = {
                type: this.type,
                service: this.service,
                name: this.formData.name,
                phones: [this.formData.phone],
                emails: [this.formData.email],
                organization: this.formData.organization,
                message: this.formData.message,
                agree: this.formData.agree,
            };

            this.$store.dispatch('sendFeedback', data)
                .then(data => {
                    this.$noty('success', 'Сообщение успешно отправлено');
                    this.resetForm();
                }).catch(error => { 
                    if (error.exception) this.$noty('error', error.exception);    
                }).finally(() => this.pending = false);
        },

        resetForm() {
            this.formData.name = '';
            this.formData.phone = '';
            this.formData.email = '';
            this.formData.organization = '';
            this.formData.message = '';
            this.formData.agree = false;
        }
    },

    computed: {
        errorsArray() {
            return Object.values(this.errors).filter(err => err !== false) ;
        },
        
        isValide() {
            return this.errorsArray.length === 0;
        }        
    },

    created() {},
}
</script>