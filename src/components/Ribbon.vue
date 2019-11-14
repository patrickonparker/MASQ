<template>
	<q-ribbon
		v-bind="blok"
		:background-color="blok.background_color"
		:leaf-color="blok.leaf_color"
		:leaf-position="blok.leaf_position"
		:size="blok.full ? 'full' : undefined"
		:type="blok.type"
		:position="blok.position"
		v-editable="blok"
	>
		{{ blok.text }}
	</q-ribbon>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
