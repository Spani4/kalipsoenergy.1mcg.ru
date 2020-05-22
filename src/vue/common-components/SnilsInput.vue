<template lang="pug">
    input.form-input(
        type="text"
        :placeholder="placeholder"
        :class="{ error: isError, required: isRequired }"
        :disabled="isDisabled"
        v-imask="mask"
        :value="value"
        @accept="$emit('input', $event.detail.unmaskedValue)"
        @complete="$emit('input', $event.detail.unmaskedValue)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    )
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {

    name: 'SnilsInput',

    props: {
        isError: {
            type: Boolean,
            default: false,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "СНИЛС"
        },
    },

    data() {
        return {
            mask: {
                mask: '000-000-000 00',
            },
        }
    },

    computed: {
        value() {
            return this.$attrs.value;
        }
    },

    directives: {
        imask: IMaskDirective,    
    },    
}
</script>