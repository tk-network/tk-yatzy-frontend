<template>
    <DynamicDialog />
</template>

<script>
export default {
    watch: {
        "$store.state.data.modal"(data) {
            console.log(data)
        }
    }
}
</script>