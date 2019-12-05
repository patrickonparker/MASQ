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
			<div v-if="content.full_width_toolbar && macApp" class="q-py-md" />
			<q-toolbar
				:class="[!leftDrawer ? 'd-closed' : '', content.toolbar_class]"
			>
				<q-btn
					v-if="sidebarButton"
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
			:bordered="content.bordered_sidebar"
			:behavior="content.sidebar_behavior ? 'mobile' : 'default'"
			:content-class="content.sidebar_class"
			:no-swipe-open="$q.platform.is.ios"
			class="non-selectable"
		>
			<div
				v-if="!content.full_width_toolbar && macApp"
				class="q-py-md q-electron-drag"
			/>
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

		<q-footer v-if="content.footer" :class="content.footer_class">
			<component
				v-for="blok in content.footer"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</q-footer>

		<q-resize-observer @resize="onResize" />
	</q-layout>
</template>

<script>
	export default {
		name: "MyLayout",
		data() {
			return {
				story: {},
				leftDrawer: false,
				windowWidth: null
			};
		},
		created() {
			this.getStory("/settings/layout");
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
				let header =
					(this.$q.platform.is.win && this.$q.platform.is.electron) ||
					this.content.full_width_toolbar
						? "hHh"
						: "lHr";
				let page = "LpR";
				let fixed = this.content.fixed_footer ? "F" : "f";
				let footer = this.content.full_width_footer
					? "f" + fixed + "f"
					: "l" + fixed + "r";
				return `${header} ${page} ${footer}`;
			},
			sidebarButton() {
				return this.content && this.windowWidth < 1024;
			}
		},
		methods: {
			onResize(size) {
				this.windowWidth = size.width;
			},
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
