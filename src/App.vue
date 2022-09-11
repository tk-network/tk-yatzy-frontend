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

        this.$store.state.ws.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);
            if(["error"].includes(data.action)) return;
            this.$store.commit("getData", data);
        });
    },
};
</script>
