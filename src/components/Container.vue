<template>
	<div
		:class="[
			'container',
			blok.disable_bottom_margin ? '' : 'standard-margin',
			blok.full_width ? 'full-width-container q-layout-padding' : '',
			blok.shape,
			blok.class
		]"
		:style="blok.style"
		v-editable="blok"
	>
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

<style lang="scss" scoped>
	.container {
		max-width: 1440px;
		margin: 0 auto;
		width: 100%;
	}
	.standard-margin {
		margin-bottom: 48px !important;
	}
	.full-width-container {
		max-width: none;
		@media (max-width: 599px) {
			margin: 0 -8px;
			width: calc(100% + 16px);
		}
		@media (min-width: 600px) and (max-width: 1439px) {
			margin: 0 -16px;
			width: calc(100% + 32px);
		}
		@media (min-width: 1440px) {
			margin: 0 -24px;
			width: calc(100% + 48px);
		}
	}
	.bottom {
		&-curve {
			-webkit-clip-path: ellipse(100% 60% at 50% 40%);
			clip-path: ellipse(100% 60% at 50% 40%);
		}

		&-arrow {
			-webkit-clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
			clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);

			&-left {
				-webkit-clip-path: polygon(0 0, 100% 0, 100% 80%, 25% 100%, 0 80%);
				clip-path: polygon(0 0, 100% 0, 100% 80%, 25% 100%, 0 80%);
			}

			&-right {
				-webkit-clip-path: polygon(0 0, 100% 0, 100% 80%, 75% 100%, 0 80%);
				clip-path: polygon(0 0, 100% 0, 100% 80%, 75% 100%, 0 80%);
			}
		}

		&-lean {
			&-left {
				-webkit-clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
				clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
			}

			&-right {
				-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
			}
		}
	}

	.slope {
		&-clockwise {
			-webkit-clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
			clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
		}

		&-counter-clockwise {
			-webkit-clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%);
			clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%);
		}
	}
</style>
