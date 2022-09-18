<template>
    <Toast />
</template>

<script>
export default {
    watch: {
        "$store.state.data.message"(data) {
            this.$toast.add({
                severity: data.type,
                summary: data.title,
                detail: data.message,
                life: 6000
            });
        }
    }
}
</script>