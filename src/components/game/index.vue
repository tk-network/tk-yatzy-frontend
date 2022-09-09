<template>
    <sidebar />

    <yatzy-table
        :roomData="roomData"
        :model="model"
        :onRole="onRole"
        @resetActivation="activeCubes = []"
    />

    <div class="cubes">
        <cube
            v-for="i in countCubes"
            :key="i"
            :position="i"
            :active="activeCubes.includes(i)"
            @click="toggleCube(i)"
        />
    </div>

    <div style="text-align: center;">
        <Button
            :disabled="!(roomData?.room?.activeUser == $store.state.user.id) || roomData.room.numberOfThrows == 3 || onRole"
            v-text="'Würfeln'"
            @click="roleTheCube"
        />
        <br><br>
        <Button
            v-if="$store.state.user?.id == roomData?.room?.presenter"
            v-text="'Neue Runde'"
            @click="newRound"
        />
    </div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import yatzyTable from "./components/yatzyTable.vue";
import cube from "./components/cube.vue"
import clasic from "./models/clasic";

export default {
    components: {
        sidebar,
        yatzyTable,
        cube,
    },
    data() {
        return {
            roomData: {},
            activeCubes: [],
            countCubes: 5,
            model: clasic,
            onRole: false,
        }
    },
    methods: {
        roleTheCube() {
            this.onRole = true;
            setTimeout(() => this.onRole = false, this.$cubeSpinTime * this.$cubeSpinCount)

            let notActiveCubes = Array.from({length: this.countCubes}, (_, i) => i + 1).filter(number => !this.activeCubes.includes(number))
            this.$store.state.ws.up({ action: "roleTheCube", data: notActiveCubes });
        },
        newRound() {
            this.$store.state.ws.up({ action: "nextRound", data: null });
        },
        toggleCube(position) {
            if(!this.roomData.room.numberOfThrows || this.$store.state.user.id != this.roomData.room.activeUser) return;

            if(this.activeCubes.includes(position)) {
                let index = this.activeCubes.indexOf(position);
                if(index != -1) this.activeCubes.splice(index, 1);
            } else {
                this.activeCubes.push(position);
            }
        }
    },
    watch: {
        "$store.state.data.room"(data) {
            this.roomData = data;
        }
    }
}
</script>

<style scoped>
.cubes {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: auto;
    padding: 8px;
}
</style>