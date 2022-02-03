<template>
	<div class="video pa-1">
		<div class="video-body">
			<div class="video-title px-2 py-3 text-truncate">
				{{ video.title }}
			</div>
			<div class="video-img_wrapper">
				<v-img class="video-img_wrapper-img" :src="videoSRC" />
			</div>
			<div class="video-description px-5 py-3">
				<span class="description" :class="{ hide: hide }">
					{{ video.description }}
				</span>
				<v-btn outlined color="white" class="show mt-5" @click="showAll">
					<span v-if="hide"> Показаль польностью</span>
					<span v-else> Скрыть ? </span>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'video-desplay',
		props: {
			video: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				hide: true,
			};
		},
		computed: {
			videoSRC() {
				if (this.video) {
					return this.video.thumbnails.maxres.url;
				}
				return '';
			},
		},
		methods: {
			showAll() {
				this.hide = !this.hide;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.video {
		color: #fff;
		background: linear-gradient(
			45deg,
			#ff0000 0%,
			#ff9a00 10%,
			#d0de21 20%,
			#4fdc4a 30%,
			#54c5e7 40%,
			#5273dd 50%,
			#172ba0 60%,
			#8f3cfa 70%,
			#5612c2 80%,
			#f536bb 90%,
			#ff0000 100%
		);
		border-radius: 20px;
		&-body {
			box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.8) inset,
				0px 0px 5px 0px rgba(0, 0, 0, 0.8);
			border-radius: 20px;
			background: rgba(43, 2, 43, 0.9);
		}
		&-title {
			text-overflow: ellipsis;
			font-size: 22px;
		}
		&-img_wrapper {
			width: 100%;
			&-img {
				max-height: 320px;
			}
		}
		&-description {
			font-size: 14px;

			.description {
				display: block;
				&.hide {
					height: 250px;
					overflow: hidden;
					@media (min-width: 1265px) {
						height: 150px;
					}
				}
			}
		}
	}
	.rgb::after {
		content: '';
		position: absolute;
		background: linear-gradient(
				45deg,
				#ff0000 0%,
				#ff9a00 10%,
				#d0de21 20%,
				#4fdc4a 30%,
				#54c5e7 40%,
				#5273dd 50%,
				#172ba0 60%,
				#8f3cfa 70%,
				#5612c2 80%,
				#f536bb 90%,
				#ff0000 100%
			)
			repeat 0% 0% / 300% 100%;
		inset: -3px;
	}
</style>
