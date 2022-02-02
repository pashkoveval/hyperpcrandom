<template>
	<div class="video">
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
		background: rgba(0, 0, 0, 0.616);
		border-radius: 20px;
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
</style>
