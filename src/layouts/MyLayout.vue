<template>
	<q-layout :view="layout" :class="macApp ? 'electron-mac' : false">
		<q-header elevated class="q-electron-drag non-selectable">
			<q-bar v-if="winApp">
				<q-icon name="mdi-laptop" />
				<div>App Name & Icon</div>
				<q-space />
				<q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
				<q-btn dense flat icon="mdi-window-maximize" @click="maximize" />
				<q-btn dense flat icon="mdi-close" @click="close" />
			</q-bar>
			<q-toolbar :class="!leftDrawer ? 'd-closed' : ''">
				<q-btn
					v-if="content.sidebar"
					flat
					dense
					round
					@click="leftDrawer = !leftDrawer"
					icon="mdi-menu"
					aria-label="Menu"
				/>
				<q-toolbar-title
					v-if="content.show_page_name_in_toolbar"
					style="flex: 0 0 auto;"
				>
					<portal-target name="header" />
				</q-toolbar-title>
				<component
					v-for="blok in content.toolbar"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-if="content.sidebar"
			v-model="leftDrawer"
			show-if-above
			content-class="bg-grey-10"
			class="non-selectable"
		>
			<div :style="macApp ? 'height: 32px;' : ''" />
			<component
				v-for="blok in content.sidebar"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
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
				story: {},
				leftDrawer: false
			};
		},
		created() {
			this.getStory("/app/layout");
		},
		computed: {
			content() {
				return this.story.content || {};
			},
			macApp() {
				return this.$q.platform.is.mac && this.$q.platform.is.electron;
			},
			winApp() {
				return this.$q.platform.is.win && this.$q.platform.is.electron;
			},
			layout() {
				return (this.$q.platform.is.win && this.$q.platform.is.electron) ||
					this.story.full_width_toolbar
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
					let win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();
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
		}
	};
</script>
