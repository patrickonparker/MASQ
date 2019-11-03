<template>
	<q-item v-bind="blok" :inset-level="Number(blok.inset_level)" v-ripple>
		<q-item-section avatar v-if="(blok.avatar || {}).length > 0">
			<component
				v-for="blok in blok.avatar"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ blok.text | first4Chars }}</q-item-label>
			<q-item-label caption :lines="blok.caption_line_cap">{{
				blok.caption
			}}</q-item-label>
		</q-item-section>
		<q-item-section
			side
			v-if="(blok.content || {}).length > 0"
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
