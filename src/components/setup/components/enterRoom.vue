<template>
    <strong class="headline">Raum beitreten</strong>

    <div class="p-fluid code">
        <div 
            v-for="i in 6"
            :key="i"
        >
            <InputNumber
                v-model="numbers[i]"
                mode="decimal"
                :inputId="`code-${i}`"
                inputStyle="text-align: center;"
                :inputProps="{ autofocus: i == 1, inputmode: 'decimal' }"
                :min="0"
                :max="9"
                @keyup="nextInput($event, i)"
            />
        </div>
    </div>

    <br />

    <div style="text-align: center;">
        <Button class="p-button-text" @click="createRoom">Raum erstellen</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numbers: {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
            }
        }
    },
    computed: {
        number() {
            return Object.values(this.numbers).join("");
        }
    },
    methods: {
        nextInput(event, i) {
            if(!event.target.value && event.key == "Backspace") {
                let nextI = i - 1;
                if(i == 0) return;

                this.numbers[nextI] = null;
                document.getElementById(`code-${nextI}`).focus();

                return;
            }
            if(!event.target.value) return;

            if(!event.key.match(/[0-9]/)) return;
            let nextI = i + 1;
            if(nextI <= 6) document.getElementById(`code-${nextI}`).select();
            if(i == 6) document.getElementById(`code-1`).select();
        },
        createRoom() {
            this.$store.state.ws.up({ action: "createRoom", data: null });
        }
    },
    watch: {
        number() {
            this.$emit("data", this.number);
            if(this.number.length == 6) this.$emit("enter");
        }
    }
}
</script>

<style scoped>
.code {
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 60%;
    margin: auto;
    text-align: center !important;
}

.headline {
    margin-bottom: 12px;
    display: block;
    text-align: center;
}
</style>