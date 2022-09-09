<template>
    <Message />
    <DynamicDialog />
    <router-view />
</template>

<script>
import Message from './scripts/message/index.vue';
export default {
    name: "App",
    components: {
        Message,
    },
    async mounted() {
        await this.$store.dispatch("connect");

        this.$store.state.ws["up"] = (data) => {
            this.$store.state.ws.send(JSON.stringify(data));
        }

        this.$store.state.ws.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);
            if(["error"].includes(data.action)) return;
            this.$store.commit("getData", data);
        });
    },
};
</script>
