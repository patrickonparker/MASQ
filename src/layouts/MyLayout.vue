<template>
	<q-layout :view="layout" :class="macApp ? 'electron' : false">
		<q-header elevated class="q-electron-drag">
			<q-bar v-if="winApp">
				<q-icon name="mdi-laptop" />
				<div>App Name & Icon</div>
				<q-space />
				<q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
				<q-btn dense flat icon="mdi-window-maximize" @click="maximize" />
				<q-btn dense flat icon="mdi-close" @click="close" />
			</q-bar>
			<q-toolbar
				style="transition: .1s;"
				:style="macApp && !leftDrawer ? 'margin-top: 30px;' : ''"
			>
				<q-btn
					flat
					dense
					round
					@click="leftDrawer = !leftDrawer"
					icon="mdi-menu"
					aria-label="Menu"
				/>
				<q-toolbar-title>
					<portal-target name="header" />
				</q-toolbar-title>
				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawer"
			show-if-above
			:content-class="macApp ? '' : ['bg-grey-10']"
		>
			<q-list
				:dark="macApp ? darkTheme : dark"
				:style="macApp ? 'margin-top: 32px;' : ''"
			>
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
		},
		computed: {
			macApp() {
				return this.$q.platform.is.mac && this.$q.platform.is.electron;
			},
			winApp() {
				return this.$q.platform.is.win && this.$q.platform.is.electron;
			},
			darkTheme() {
				return window.matchMedia("(prefers-color-scheme: dark)").matches;
			},
			layout() {
				return this.$q.platform.is.win && this.$q.platform.is.electron
					? "hHh Lpr lFf"
					: "lHh Lpr lFf";
			}
		},
		methods: {
			minimize() {
				if (process.env.MODE === "electron") {
					this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
				}
			},

			maximize() {
				if (process.env.MODE === "electron") {
					const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

					if (win.isMaximized()) {
						win.unmaximize();
					} else {
						win.maximize();
					}
				}
			},

			close() {
				if (process.env.MODE === "electron") {
					this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
				}
			}
		},
		created() {
			if (process.env.MODE === "electron") {
				document.getElementsByTagName("body")[0].style.overflow = "hidden";
				document.getElementById("q-app").style.overflow = "auto";
				document.getElementById("q-app").style.maxHeight = "100vh";
			}
		}
	};
</script>
