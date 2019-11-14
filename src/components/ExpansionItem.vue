<template>
	<q-expansion-item
		v-bind="blok"
		:expand-icon="expandIcon"
		:header-class="blok.class"
		:header-style="blok.style"
		:icon="icon"
		v-editable="blok"
	>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-expansion-item>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			icon() {
				return this.mdi(this.blok.icon);
			},
			expandIcon() {
				return this.mdi(this.blok.expand_icon);
			}
		}
	};
</script>
