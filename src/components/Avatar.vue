<template>
	<q-avatar
		v-bind="blok"
		:color="check(blok.picture) ? '' : blok.color"
		:font-size="blok.font_size"
		:icon="check(blok.picture) ? '' : mdi"
		:rounded="blok.shape === 'rounded'"
		:square="blok.shape === 'square'"
		:text-color="blok.text_color"
	>
		{{ check(blok.picture) || check(blok.icon) ? "" : blok.text }}
		<component
			v-for="blok in blok.picture"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-avatar>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			mdi() {
				return this.check(this.blok.icon) ? "mdi-" + this.blok.icon : "";
			}
		}
	};
</script>
