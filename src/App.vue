<template>
    <Message />
    <Modal />
    <router-view />
</template>

<script>
import Message from "./scripts/message/index.vue";
import Modal from "./components/modal/index.vue";

export default {
    name: "App",
    components: {
        Message,
        Modal,
    },
    async mounted() {
        await this.$store.dispatch("connect");
    },
};
</script>
