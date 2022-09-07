<template>
    <Toast />
</template>

<script>
export default {
    mounted() {
        this.$ws.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);

            switch(data.action) {
                case "error":
                    return this.$toast.add({severity: 'error', summary: 'Fehler!', detail: data.data, life: 6000});
            }
        });
    }
}
</script>