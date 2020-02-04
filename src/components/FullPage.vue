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
				:class="'fullpage_slide'"
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
			scrollToSlide(el) {
				let fullpage = document.querySelector(".fullpage");
				let fullpage_slide = document.querySelector(`#blok-${el._uid}`);
				let top = fullpage_slide.offsetTop;
				fullpage.scroll({ top: top, left: 0, behavior: "smooth" });
			},
			scrollHandler() {
				let fullpage = document.querySelector(".fullpage");
				let slides = document.querySelectorAll(".fullpage_slide");
				let current = Math.floor(fullpage.scrollTop / fullpage.clientHeight);
				this.current = slides[current].id.replace("blok-", "");
			}
		},
		mounted() {
			this.scrollHandler();
		}
	};
</script>

<style lang="scss">
	.fullpage {
		overflow-y: scroll;
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
		}

		&_indicators {
			position: absolute;
			top: 0;
			right: 10px;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			pointer-events: none;

			.q-btn {
				pointer-events: all;
			}

			.q-icon {
				text-shadow: 1px 1px 2px black;
			}
		}
	}
</style>