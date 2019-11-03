<template>
	<q-btn-dropdown
		v-bind="blok"
		:icon="'mdi-' + blok.icon"
		:no-caps="blok.no_caps"
		:dropdown-icon="'mdi-menu-down'"
		v-ripple
	>
		<component
			v-for="blok in blok.list"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
		<component
			v-for="blok in blok.badge"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-btn-dropdown>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
