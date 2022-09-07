<template>
    <Toolbar style="padding: 8px;">
        <template #start>
            <Button
                class="p-button-rounded"
                icon="pi pi-bars"
                iconPos="left"
                @click="opened = true"
            />
        </template>

        <template #end>
            <div>
                <span style="font-size: 10px;">Raum-ID:</span>
                <br />
                <b>{{ $store.state.user.room }}</b>
            </div>
        </template>
    </Toolbar>

    <hr />

    <Sidebar v-model:visible="opened">
        <h2>Hallo {{ $store.state.user.username }}!</h2>
        <Menu
            :model="items"
            style="width: 100%;" 
        />
    </Sidebar>
</template>

<script>
export default {
    data() {
		return {
            opened: false,
			items: [
				{
					label: 'Raum verwalten',
					icon: 'pi pi-cog',
					url: '#comming-soon'
				},
				{
					label: 'Mein Profil',
					icon: 'pi pi-user',
					url: '#comming-soon'
				},
				{
                    label: 'Raum verlassen',
                    icon: 'pi pi-sign-out',
                    command: () => {
						this.$store.state.user.room = null;
					}
                }
			]
		}
	}
}
</script>