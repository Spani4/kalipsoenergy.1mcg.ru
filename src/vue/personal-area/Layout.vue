<template lang="pug">
    .personal-area
        .wrapper personal area
</template>



<script>
export default {
    props: {
        show: Boolean,
    },
    
    mounted() {
        console.log(this);
    }
}
</script>