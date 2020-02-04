<template>
	<div class="fullpage_wrapper">
		<div
			:class="['fullpage absolute-full', blok.class]"
			:style="blok.style"
			@scroll="scrollHandler"
		>
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
				class="fullpage_slide"
				:id="'blok-' + blok._uid"
			/>
		</div>
		<div class="fullpage_indicators">
			<q-btn
				v-for="blok in blok.content"
				:key="blok._uid"
				@click="scrollToSlide(blok)"
				color="white"
				flat
				ripple
				round
				:size="size"
			>
				<q-icon
					:name="blok._uid === current ? 'mdi-circle' : 'mdi-circle-outline'"
				/>
			</q-btn>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["blok"],
		data: () => ({ current: "" }),
		methods: {
			scrollToSlide(blok) {
				const fullpage = this.$el.childNodes[0];
				let fullpage_slide = document.querySelector(`#blok-${blok._uid}`);
				fullpage_slide.scrollIntoView();
			},
			scrollHandler() {
				const fullpage = this.$el.childNodes[0];
				let slides = fullpage.childNodes;
				let current = Math.floor(
					(fullpage.scrollTop + fullpage.clientHeight / 2) / fullpage.clientHeight
				);
				this.current = slides[current].id.replace("blok-", "");
			}
		},
		mounted() {
			this.scrollHandler();
		},
		computed: {
			size() {
				let userSize = this.blok.indicator_size;
				let size = userSize ? userSize : this.bp;
				return size;
			}
		}
	};
</script>

<style lang="scss">
	.fullpage {
		overflow-y: scroll;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;

		&_slide {
			height: 100%;
			width: 100%;
			min-height: 100%;
			max-height: 100%;
			min-width: 100%;
			max-width: 100%;
			scroll-snap-align: start;
			overflow: hidden;
			margin: 0 0 !important;
		}

		&_indicators {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			pointer-events: none;

			.q-btn {
				pointer-events: all;

				.q-icon {
					text-shadow: 1px 1px 2px black;
				}
			}
		}
	}
</style>