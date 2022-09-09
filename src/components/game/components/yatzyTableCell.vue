<template>
    <td>
        <span
            :style="field.style"
            v-text="field.output(field, roomData, user)"
        />
        <div
            v-if="tooltip !== false"
            :class="`tooltip ${position % 2 ? 'left' : 'right'}`"
            v-text="tooltip"
            @click="setField"
        />
        <div
            v-if="tooltip !== false"
            :class="`dreieck ${position % 2 ? 'left' : 'right'}`"
        />
    </td>
</template>

<script>
export default {
    props: ["field", "roomData", "position", "user", "onRole"],
    computed: {
        thrownNumbers() {
            let rounds = this.roomData.room.rounds;
            return rounds.length ? Object.values(rounds[rounds.length-1].thrownNumbers) : [];
        },
        tooltip() {
            let activeRoomUser = this.roomData.room.activeUser;
            if(!this.field.rule || !this.roomData.room.numberOfThrows || this.$store.state.user.id != activeRoomUser || activeRoomUser != this.user.id || this.onRole) return false;
            if(this.roomData.room.rounds.some(round => round.fieldId == this.field.id && round.round == this.roomData.room.round && round.user == this.user.id)) return false;
            let ausgabe = this.field.rule(this.thrownNumbers, this.roomData, this);
            return ausgabe || (!ausgabe && this.roomData.room.numberOfThrows == 3) ? ausgabe : false;
        },
    },
    methods: {
        setField() {
            this.$store.dispatch("up", { action: "setField", data: this.field.id });
            this.$emit("resetActivation");
        }
    }
}
</script>

<style scoped>
td {
    position: relative;
    text-align: center;
    padding: 6px;
}

.tooltip {
    position: absolute;
    top: -2px;
    width: 32px;
    height: 32px;
    z-index: 10;
    padding: 4px;
    border-radius: 24px;
    border: 1px solid rgb(33, 150, 243);
    background: rgb(35, 35, 35);
    color: white;
    text-align: center;
    cursor: pointer;
    line-height: 22px;
    box-shadow: 5px 4px 18px #888888;
}

.tooltip.left {
    left: -32px;
}

.tooltip.right {
    right: -32px;
}

.dreieck {
    position: absolute;
    top: -2px;
    z-index: 9;
    width: 0px;
    height: 0px;
    -webkit-transform: rotate(360deg);
    border-style: solid;
}

.dreieck.left {
    left: -16px;
    border-width: 16px 0 16px 28px;
    border-color: transparent transparent transparent rgb(33, 150, 243);
}

.dreieck.right {
    right: -16px;
    border-width: 16px 28px 16px 0;
    border-color: transparent rgb(33, 150, 243) transparent transparent;
}
</style>