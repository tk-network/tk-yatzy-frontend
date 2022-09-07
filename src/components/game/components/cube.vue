<template>
    <div class="scene">
        <div :class="`cube ${cubeClass}`">
            <div class="cube__face cube__face--one">
                <div />
            </div>
            <div class="cube__face cube__face--six">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <div class="cube__face cube__face--three">
                <div />
                <div />
                <div />
            </div>
            <div class="cube__face cube__face--four">
                <div />
                <div />
                <div />
                <div />
            </div>
            <div class="cube__face cube__face--five">
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <div class="cube__face cube__face--two">
                <div />
                <div />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["position"],
    data() {
        return {
            cubeDic: {
                1: "one",
                2: "two",
                3: "three",
                4: "four",
                5: "five",
                6: "six",
            },
            cubeClass: "show-one",
        }
    },
    watch: {
        async "$store.state.data.cube"(data) {
            if(!(this.position in data)) return;
            data = data[this.position];

            function timeout(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            for(const number of Object.values(data)) {
                this.cubeClass = `show-${this.cubeDic[number]}`;
                await timeout(this.$cubeSpinTime);
            }
        }
    }
}
</script>

<style scoped>
.scene {
    width: 50px;
    height: 50px;
    margin: 6px;
    perspective: 200px;
    cursor: pointer;
}

.cube {
    width: 50px;
    height: 50px;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-25px);
    transition: transform .3s;
}

.cube.show-one {
    transform: translateZ(-25px) rotateY(0deg);
}

.cube.show-three {
    transform: translateZ(-25px) rotateY(-90deg);
}

.cube.show-six {
    transform: translateZ(-25px) rotateY(-180deg);
}

.cube.show-four {
    transform: translateZ(-25px) rotateY(90deg);
}

.cube.show-five {
    transform: translateZ(-25px) rotateX(-90deg);
}

.cube.show-two {
    transform: translateZ(-25px) rotateX(90deg);
}

.cube__face {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid black;
    line-height: 50px;
    font-size: 10px;
    font-weight: bold;
    color: black;
    background: white;
    text-align: center;
}

.cube__face div {
    background: black;
    width: 8px;
    height: 8px;
    border-radius: 6px;
    position: absolute;
}

/* Beginn 1 */
.cube__face--one {
    transform: rotateY(0deg) translateZ(25px);
}

.cube__face--one div {
    top: calc(50% - 4px);
    left: calc(50% - 4px);
}
/* Ende 1 */

/* Beginn 3 */
.cube__face--three {
    transform: rotateY(90deg) translateZ(25px);
}

.cube__face--three div:nth-child(1) {
    top: calc(25% - 4px);
    left: calc(25% - 4px);
}

.cube__face--three div:nth-child(2) {
    top: calc(50% - 4px);
    left: calc(50% - 4px);
}

.cube__face--three div:nth-child(3) {
    top: calc(75% - 4px);
    left: calc(75% - 4px);
}
/* Ende 3 */

/* Beginn 6 */
.cube__face--six {
    transform: rotateY(180deg) translateZ(25px);
}

.cube__face--six div:nth-child(1) {
    top: calc(25% - 4px);
    left: calc(25% - 4px);
}

.cube__face--six div:nth-child(2) {
    top: calc(50% - 4px);
    left: calc(25% - 4px);
}

.cube__face--six div:nth-child(3) {
    top: calc(75% - 4px);
    left: calc(25% - 4px);
}

.cube__face--six div:nth-child(4) {
    top: calc(25% - 4px);
    left: calc(75% - 4px);
}

.cube__face--six div:nth-child(5) {
    top: calc(50% - 4px);
    left: calc(75% - 4px);
}

.cube__face--six div:nth-child(6) {
    top: calc(75% - 4px);
    left: calc(75% - 4px);
}
/* Ende 6 */

/* Beginn 4 */
.cube__face--four {
    transform: rotateY(-90deg) translateZ(25px);
}

.cube__face--four div:nth-child(1) {
    top: calc(25% - 4px);
    left: calc(25% - 4px);
}

.cube__face--four div:nth-child(2) {
    top: calc(25% - 4px);
    left: calc(75% - 4px);
}

.cube__face--four div:nth-child(3) {
    top: calc(75% - 4px);
    left: calc(25% - 4px);
}

.cube__face--four div:nth-child(4) {
    top: calc(75% - 4px);
    left: calc(75% - 4px);
}
/* Ende 4 */

/* Beginn 5 */
.cube__face--five {
    transform: rotateX(90deg) translateZ(25px);
}

.cube__face--five div:nth-child(1) {
    top: calc(25% - 4px);
    left: calc(25% - 4px);
}

.cube__face--five div:nth-child(2) {
    top: calc(50% - 4px);
    left: calc(50% - 4px);
}

.cube__face--five div:nth-child(3) {
    top: calc(75% - 4px);
    left: calc(75% - 4px);
}

.cube__face--five div:nth-child(4) {
    top: calc(25% - 4px);
    left: calc(75% - 4px);
}

.cube__face--five div:nth-child(5) {
    top: calc(75% - 4px);
    left: calc(25% - 4px);
}
/* Ende 5 */

/* Beginn 2 */
.cube__face--two {
    transform: rotateX(-90deg) translateZ(25px);
}

.cube__face--two div:nth-child(1) {
    top: calc(25% - 4px);
    left: calc(25% - 4px);
}

.cube__face--two div:nth-child(2) {
    top: calc(75% - 4px);
    left: calc(75% - 4px);
}
/* Ende 2 */

.scene[active="true"] .cube__face {
    border: 2px solid red;
}
</style>