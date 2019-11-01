<template>
	<q-item
		v-bind="blok"
		:inset-level="Number(blok.inset_level)"
		v-ripple
		v-editable="blok"
	>
		<q-item-section avatar>
			<q-avatar
				:color="blok.avatar.length > 0 ? '' : blok.avatar_color"
				text-color="white"
				:icon="blok.avatar_icon ? 'mdi-' + blok.avatar_icon : ''"
			>
				<span v-if="blok.avatar_text">{{ blok.avatar_text }}</span>
				<component
					v-for="blok in blok.avatar"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
					style="height: 100%; width: 100%;"
				/>
			</q-avatar>
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ blok.text }}</q-item-label>
			<q-item-label caption :lines="blok.caption_line_cap">{{
				blok.caption
			}}</q-item-label>
		</q-item-section>
		<q-item-section side v-if="blok.content" :top="blok.align_content_top">
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
