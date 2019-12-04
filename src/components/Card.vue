<template>
	<q-card v-bind="blok" :dark="darkTheme(blok.dark)" v-editable="blok">
		<component
			v-for="blok in blok.media"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
		<q-separator v-if="check(blok.media) && check(blok.content)"></q-separator>
		<q-card-section
			v-if="check(blok.content)"
			:style="`height: ${blok.content_max_height}px;`"
			:class="blok.content_max_height ? 'scroll' : ''"
		>
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</q-card-section>
		<q-separator v-if="blok.separate_actions"></q-separator>
		<q-card-actions
			v-if="check(blok.actions)"
			:align="blok.align_actions"
			:vertical="blok.stack_actions"
		>
			<component
				v-for="blok in blok.actions"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
			<slot name="actions"></slot>
		</q-card-actions>
	</q-card>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
	.row {
		.q-card {
			display: flex;
			flex-direction: column;
			height: 100%;

			&__section {
				flex: 1 1 auto;
			}

			.col-grow {
				flex: 0 0;
			}
		}
	}
</style>
