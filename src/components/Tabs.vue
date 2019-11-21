<template>
	<Fragment>
		<portal-target name="above" />
		<q-separator v-if="blok.tab_placement === 'above'" />

		<!-- Tabs -->
		<q-tab-panels v-model="tab" animated swipeable>
			<q-tab-panel
				v-for="blok in blok.content"
				:key="blok._uid"
				:name="blok.name"
			>
				<component
					v-for="blok in blok.content"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</q-tab-panel>
		</q-tab-panels>

		<!-- Tab Content -->
		<portal :to="blok.tab_placement">
			<q-tabs
				v-model="tab"
				v-bind="blok"
				:active-color="blok.active_color"
				:active-bg-color="blok.active_background_color"
				:indicator-color="blok.indicator_color"
				:inline-label="blok.inline"
				:narrow-indicator="blok.narrow_indicator"
				:no-caps="blok.no_caps"
				ripple
				v-editable="blok"
			>
				<q-tab
					v-for="blok in blok.content"
					:key="blok._uid"
					:name="blok.name"
					:icon="mdi(blok.icon)"
					:label="blok.label"
				/>
			</q-tabs>
		</portal>

		<q-separator v-if="blok.tab_placement === 'below'" />
		<portal-target name="below" />
	</Fragment>
</template>

<script>
	import { Fragment } from "vue-fragment";
	export default {
		props: ["blok"],
		components: { Fragment },
		data: () => ({
			tab: ""
		}),
		methods: {
			defaultTab() {
				String(this.blok.content).length > 0
					? (this.tab = this.blok.content[0].name)
					: (this.tab = "");
			}
		},
		mounted() {
			this.defaultTab();
		}
	};
</script>
