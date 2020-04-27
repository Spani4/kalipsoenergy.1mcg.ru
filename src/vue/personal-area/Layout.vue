<template lang="pug">
    .personal-area(v-if="$root.show")
        .wrapper 
            .personal-area__window
                button.personal-area__close-btn(
                    @click="$root.toggle"
                ) &times;
                .personal-area__content personal area
                    input(v-focus)
</template>



<script>
export default {


}
</script>