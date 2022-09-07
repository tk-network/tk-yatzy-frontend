<template>
    <table>
        <thead>
            <tr>
                <th style="min-width: 110px;" />
                <th
                    v-for="(user, index) in roomData.users"
                    :key="index"
                    :active="user.id == roomData.room.activeUser"
                    v-text="user.username"
                />
                <th style="width: 100%;" />
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(field, index) in model.fields"
                :key="index"
            >
                <td
                    :style="`min-width: 110px; ${field.style}`"
                    v-text="field.label"
                />
                <yatzy-table-cell
                    v-for="(user, index2) in roomData.users"
                    :key="index2"
                    :field="field"
                    :roomData="roomData"
                    :user="user"
                    :onRole="onRole"
                    :position="getPositionCount(user)"
                    @resetActivation="$emit('resetActivation')"
                />
                <td style="width: 100%;" />
            </tr>
        </tbody>
    </table>
</template>

<script>
import yatzyTableCell from "./yatzyTableCell.vue";

let positionCount = 0;

export default {
    components: {
        yatzyTableCell
    },
    props: ["roomData", "model", "onRole"],
    methods: {
        getPositionCount(user) {
            if(user.id != this.roomData.room.activeUser) return 0;
            positionCount++;
            return positionCount;
        }
    }
}
</script>

<style scoped>
th[active="true"] {
    color: rgb(11, 122, 209);
}

table {
    border-collapse: collapse;
    width: 100%;
}

table td, table th {
    border: 1px solid #ddd;
    padding: 4px;
}

table tr:nth-child(even){
    background-color: #f2f2f2;
}

table tr:hover {
    background-color: #ddd;
}

table th {
    padding: 8px;
    text-align: left;

}
</style>