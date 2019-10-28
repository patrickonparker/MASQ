<template>
	<div :class="responsive" v-editable="blok">
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
		props: ["blok"],
		computed: {
			responsive() {
				let bootstrapCols = ["xsmall", "small", "medium", "large", "xlarge"];
				let quasarCols = ["xs", "sm", "md", "lg", "xl"];
				let classes = [];
				for (let i = 0, cols = bootstrapCols.length; i < cols; i++) {
					let size = this.blok.responsive[`${bootstrapCols[i]}`];
					let col = quasarCols[i];
					size.length > 0 ? classes.push(`col-${col}-${size}`) : "";
				}
				return classes;
			}
		}
	};
</script>
