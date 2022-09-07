<template>
    <div v-text="wsText" />

    <p v-if="loaded">
        <input
            type="text"
            @change="clientText = $event.target.value"
        />
        <button @click="handleClientText">Test</button>
    </p>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            loaded: false,
            ws: undefined,
            clientText: "",
            wsText: "",
        }
    },
    mounted() {
        this.ws = new WebSocket('ws://192.168.178.39:8080/');
        this.ws.addEventListener("open", () => {
            this.loaded = true;
        });

        this.ws.addEventListener('message', (event) => {
            this.wsText = event.data;
        });

        window.addEventListener('beforeunload', () => {
            this.ws.close();
        })
    },
    methods: {
        handleClientText() {
            this.ws.send(this.clientText);
        }
    }
}
</script>