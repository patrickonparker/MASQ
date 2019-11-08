<template>
	<q-menu
		:fit="blok.fit"
		:offset="[Number(blok.horizontal_offset), Number(blok.vertical_offset)]"
	>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-menu>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
