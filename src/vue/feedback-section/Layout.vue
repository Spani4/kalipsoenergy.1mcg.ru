<template lang="pug">
    section.feedback.section
        .section__header
            .section__title остались вопросы? напишите нам!
        form.feedback__form
            input.form-input(
                type="text"
                placeholder="Фамилия Имя"
                :class="{ error: errors.name !== false }"
                v-model="formData.name"
                @focus="errors.name = false"
            )
            input.form-input(
                type="text"
                placeholder="Email/Моб. телефон"
                :class="{ error: errors.contact !== false }"
                v-model="formData.contact"
                @focus="errors.contact = false"
            )
            textarea.form-textarea(
                placeholder="Текст сообщения"
                maxlength="2000"
                :class="{ error: errors.message !== false }"
                v-model="formData.message"
                @focus="errors.message = false"
            )
            .feedback__errors
                p(v-for="error in errorsArray") {{ error }}
            button.feedback__send-btn.button(
                type="button"
                :class="{ pending }"
                :disabled="pending"
                @click="sendFeedback()"
            ) отправить

</template>

<script>
export default {
    data() {
        return {
            type: 'mainPage',

            formData: {
                name: '',
                contact: '',
                message: '',
            },

            errors: {
                name: false,
                contact: false,
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

                case 'contact': {
                        if ( !data.length ) this.errors.contact = 'Введите email или мобильный телефон';
                        if ( data.length > 150 ) this.formData[field] = data.substr(0, 150);
                        if ( data.match('^.+@.+\..$') ) return;
                        data = data.replace(/\D/g, '');
                        this.formData[field] = data;
                        if ( data.length < 11 ) this.errors.contact = 'Введите корректный email или мобильный телефон';
                    };
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
                ...this.formData,
            };

            this.$store.dispatch('sendFeedback', data)
                .then(() => {
                    this.$noty('success', 'Сообщение успешно отправлено');
                    this.resetForm();
                }).finally(() => this.pending = false);
        },

        resetForm() {
            this.formData.name = '';
            this.formData.contact = '';
            this.formData.message = '';
        }
    },

    computed: {
        errorsArray() {
            return Object.values(this.errors).filter(err => err !== false) ;
        },
        
        isValide() {
            return this.errorsArray.length === 0;
        }
    }
}
</script>