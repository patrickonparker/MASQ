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
			content-class="bg-grey-10"
			class="non-selectable"
		>
			<div :style="macApp ? 'height: 32px;' : ''" />
			<component
				v-for="blok in (layoutContent || {}).sidebar"
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
	import StoryblokClient from "storyblok-js-client";
	let storyapi = new StoryblokClient({
		accessToken: process.env.SB_TOKEN
	});

	export default {
		name: "MyLayout",
		data() {
			return {
				layoutContent: {},
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
			async getStory(slug, version) {
				await storyapi
					.get("cdn/stories/" + slug, {
						version: version
					})
					.then(response => {
						this.layoutContent = response.data.story.content;
					})
					.catch(error => {
						console.log(error);
					});
			},
			getVersion() {
				let path = "layout";
				if (!this.$q.platform.is.electron && this.$q.platform.within.iframe) {
					window.storyblok.on("change", () => {
						this.getStory(path, "draft");
					});
					window.storyblok.pingEditor(() => {
						if (window.storyblok.isInEditor()) {
							this.getStory(path, "draft");
						} else {
							this.getStory(path, "published");
						}
					});
				} else {
					this.getStory(path, "published");
				}
			},
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
			this.getVersion();
			if (process.env.MODE === "electron") {
				document.getElementsByTagName("body")[0].style.overflow = "hidden";
				document.getElementById("q-app").style.overflow = "auto";
				document.getElementById("q-app").style.maxHeight = "100vh";
			}
		}
	};
</script>
