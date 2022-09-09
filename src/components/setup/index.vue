<template>
    <Card class="card">
        <template #header>
            <img alt="TK-Yatzy" src="../../assets/logo.png" />
        </template>
        <template #title>
            <strong v-text="welcomeText" />
        </template>
        <template #content>
            <enter-name
                v-if="!$store.state.user.username"
                @data="data = $event"
                @enter="handleNext"
            />
            <enter-room
                v-else-if="!$store.state.user.room"
                @data="data = $event"
                @enter="handleNext"
            />
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Weiter" @click="handleNext"/>
            <Button icon="pi pi-times" label="Abbrechen" class="p-button-secondary" style="float: right;" />
        </template>
    </Card>
</template>

<script>
import enterName from "./components/enterName.vue";
import enterRoom from "./components/enterRoom.vue";

export default {
    components: {
        enterName,
        enterRoom,
    },
    data() {
        return {
            data: "",
        }
    },
    computed: {
        welcomeText() {
            const user = this.$store.state.user.username;
            return `Herzlich Willkommen${user ? " "+user : ""}!`;
        }
    },
    methods: {
        handleNext() {
            if(!this.$store.state.user.username) {
                this.$store.dispatch("up", { action: "setUsername", data: this.data });
            } else if(!this.$store.state.user.room) {
                if(this.data.length != 6) return;
                this.$store.dispatch("up", { action: "setRoom", data: this.data });
            }
        }
    },
    watch: {
        "$store.state.data.setup"(data) {
            this.$store.commit("updateUser", { key: data.key, value: data.value })
        }
    }
}
</script>

<style scoped>
.card {
    margin: auto;
}

@media only screen and (max-width: 400px) {
    .card {
        height: 100%;
    }
}

@media only screen and (min-width: 401px) {
    .card {
        width: 400px;
    }
}
</style>