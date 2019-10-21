<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar
				class="q-electron-drag"
				style="transition: .1s;"
				:style="$q.platform.is.mac && !leftDrawer ? 'margin-top: 30px;' : ''"
			>
				<q-btn
					flat
					dense
					round
					@click="leftDrawer = !leftDrawer"
					icon="mdi-menu"
					aria-label="Menu"
				/>
				<q-toolbar-title>Quasar App</q-toolbar-title>
				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawer" show-if-above content-class="bg-grey-10">
			<q-list dark :style="$q.platform.is.mac ? 'margin-top: 32px;' : ''">
				<q-item-label header>Essential Links</q-item-label>
				<q-item clickable tag="a" target="_blank" href="https://quasar.dev">
					<q-item-section avatar>
						<q-icon name="mdi-school" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Docs</q-item-label>
						<q-item-label caption>quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://github.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="mdi-github-circle" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Github</q-item-label>
						<q-item-label caption>github.com/quasarframework</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://chat.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="mdi-chat" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Discord Chat Channel</q-item-label>
						<q-item-label caption>chat.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://forum.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="mdi-forum" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Forum</q-item-label>
						<q-item-label caption>forum.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://twitter.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="mdi-twitter" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Twitter</q-item-label>
						<q-item-label caption>@quasarframework</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://facebook.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="mdi-facebook" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Facebook</q-item-label>
						<q-item-label caption>@QuasarFramework</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: "MyLayout",

	data() {
		return {
			leftDrawer: false
		};
	}
};
</script>
