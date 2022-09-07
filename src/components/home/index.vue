<template>
    <setup v-if="!$store.state.user.username || !$store.state.user.room" />
    <game v-else />
</template>

<script>
import setup from "../setup/index.vue";
import game from "../game/index.vue";

export default {
    components: {
        setup,
        game,
    }
}
</script>