<template lang="pug">
    section.feedback.section
        .section__header
            .section__title остались вопросы? напишите нам!
        form.feedback__form
            input.form-input(
                type="text"
                placeholder="Фамилия Имя"
                v-model="name"
            )
            input.form-input(
                type="text"
                placeholder="Email/телефон"
                v-model="contacts"
            )
            textarea.form-textarea(
                placeholder="Текст сообщения"
                v-model="message"
            )
            button.feedback__send-btn.button(
                :disabled="name.length == 0 || contacts.length == 0 || message.length == 0"
                @click="sendFeedback"
            ) отправить
</template>

<script>
export default {
    data() {
        return {
            name: '',
            contacts: '',
            message: '',
        }
    },

    methods: {
        sendFeedback() {
            this.name = '';
            this.contacts = '';
            this.message = '';
        }
    }
}
</script>