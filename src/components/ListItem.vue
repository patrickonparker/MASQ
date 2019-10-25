<template>
	<q-item v-bind="blok" :inset-level="Number(blok.inset_level)">
		<q-item-section avatar v-if="blok.avatar || blok.avatar_text">
			<q-avatar :color="blok.color" text-color="white">
				<span v-if="blok.avatar_text">{{ blok.avatar_text }}</span>
				<component
					v-for="blok in blok.avatar"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
					v-bind="blok"
				/>
			</q-avatar>
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ blok.text }}</q-item-label>
			<q-item-label caption lines="1">{{ blok.caption }}</q-item-label>
		</q-item-section>
		<q-item-section side v-if="blok.content" :top="blok.align_content_top">
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
				v-bind="blok"
			/>
		</q-item-section>
	</q-item>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
