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
    mounted() {
        //this.$ws = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);
        //console.log(this.$ws)
        this.$ws.addEventListener("open", () => {
            this.$ws["up"] = (data) => {
                this.$ws.send(JSON.stringify(data));
            }
            this.$ws.addEventListener("message", (event) => {
                let data = JSON.parse(event.data);
                if(["error"].includes(data.action)) return;
                this.$store.commit("getData", data);
            });
        });
        
    }
};
</script>
