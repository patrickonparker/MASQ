<template>
	<form
		method="POST"
		:action="'https://formsubmit.co/' + blok.email_address"
		:class="blok.class"
		:style="blok.style"
	>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
		<input type="hidden" name="_next" :value="blok.confirmation_page" />
		<input type="hidden" name="_subject" :value="blok.email_subject" />
		<input type="text" name="_honey" style="display:none" />
		<input type="hidden" name="_captcha" value="false" />
		<component
			v-for="blok in blok.actions"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</form>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
