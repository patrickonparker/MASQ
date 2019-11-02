<template>
	<div
		:class="[
			blok.greater_than,
			blok.less_than,
			blok.hide_on,
			blok.only_show_on,
			blok.orientation
		]"
	>
		<component
			v-for="blok in blok.children"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</div>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
