<template>
	<div :class="['row', `q-col-gutter-${blok.gutter}`]">
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

<style lang="scss">
	.q-col-gutter-x-xs,
	.q-col-gutter-xs {
		width: calc(100% + 4px);
	}
	.q-col-gutter-x-sm,
	.q-col-gutter-sm {
		width: calc(100% + 8px);
	}
	.q-col-gutter-x-md,
	.q-col-gutter-md {
		width: calc(100% + 16px);
	}
	.q-col-gutter-x-lg,
	.q-col-gutter-lg {
		width: calc(100% + 24px);
	}
	.q-col-gutter-x-xl,
	.q-col-gutter-xl {
		width: calc(100% + 48px);
	}
</style>
