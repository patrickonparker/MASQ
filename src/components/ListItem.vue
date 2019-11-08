<template>
	<q-item
		v-bind="blok"
		:inset-level="Number(blok.inset_level)"
		:to="blok.to | linkType"
		@click="openLink(blok.to)"
		v-ripple
		v-editable="blok"
	>
		<q-item-section avatar v-if="check(blok.avatar)">
			<component
				v-for="blok in blok.avatar"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ blok.text }}</q-item-label>
			<q-item-label caption :lines="blok.caption_line_cap">{{
				blok.caption
			}}</q-item-label>
		</q-item-section>
		<q-item-section
			side
			v-if="check(blok.content)"
			:top="blok.align_content_top"
		>
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</q-item-section>
	</q-item>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
