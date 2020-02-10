<template>
	<div class="embed-container">
		<iframe
			:src="videoURL"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			videoURL() {
				var input = this.blok.video_url;
				var baseURL = "";
				var videoID = "";
				if (input.includes("youtu")) {
					baseURL = "https://www.youtube.com/embed/";
					if (input.includes("youtube")) {
						videoID = input.split("?v=")[1];
					} else if (input.includes("youtu.be")) {
						videoID = input.split(".be/")[1];
					}
				} else if (input.includes("vimeo")) {
					baseURL = "https://player.vimeo.com/video/";
					videoID = input.split("vimeo.com/")[1];
				}
				let autoplay = `?autoplay=${this.blok.auto_play ? "1" : "0"}`;
				let mute = `&mute=${this.blok.mute ? "1" : "0"}`;
				return baseURL + videoID + autoplay + mute + '&rel=0';
			}
		}
	};
</script>

<style>
	.embed-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		max-width: 100%;
	}
	.embed-container iframe,
	.embed-container object,
	.embed-container embed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
