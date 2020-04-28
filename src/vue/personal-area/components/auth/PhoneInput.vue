<template lang="pug">
    input.form-input(
        type="text"
        placeholder="Логин (Мобильный телефон)"
        :class="{ error: isError }"
        v-imask="phoneMask"
        :model="value"
        @accept="$emit('input', $event.detail.unmaskedValue)"
        @complete="$emit('input', $event.detail.unmaskedValue)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    )
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {
    props: {
        isError: Boolean
    },

    data() {
        return {
            phoneMask: {
                mask: '+{7} (000) 000-00-00',
            },
            value: '',
        }
    },

    directives: {
        imask: IMaskDirective,    
    }
    
}
</script>