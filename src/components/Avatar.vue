<template>
	<q-avatar
		v-bind="blok"
		:color="check(blok.picture) ? '' : blok.color"
		:font-size="blok.font_size"
		:icon="check(blok.picture) ? '' : icon"
		:rounded="blok.shape === 'rounded'"
		:square="blok.shape === 'square'"
		:text-color="blok.text_color"
		v-editable="blok"
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
			icon() {
				return this.mdi(this.blok.icon);
			}
		}
	};
</script>
