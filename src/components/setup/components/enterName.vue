<template>
    <span class="p-float-label">
        <InputText
            id="username"
            type="text"
            style="width: 100%;"
            v-model="username"
            @keyup.enter="$emit('enter')"
        />
        <label for="username">Benutzername</label>
    </span>
</template>

<script>
export default {
    data() {
        return {
            username: "",
        }
    },
    watch: {
        username() {
            this.$emit("data", this.username)
        }
    }
}
</script>