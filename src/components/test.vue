<template>
	<v-row>
		<v-col v-if="API">
			<v-text-field
				v-model="url"
				outlined
				clearable
				dark
				label="Введи ссылку видео"
				class="input"
			/>
		</v-col>
	</v-row>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'test',
		data: () => ({
			url: '',
		}),
		computed: {
			...mapGetters(['COMMENTS', 'VIDEO', 'API']),
		},
		watch: {
			url(v) {
				if (v && v.length >= 32) {
					this.getURL(v);
				}
			},
		},
		methods: {
			getURL(v) {
				const url = v.substr(32, v.length);
				if (url) {
					this.$store.dispatch('GET_VIDEO_ACTION', url);
				}
			},
			getRandomInt(max) {
				return Math.floor(Math.random() * max);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.comment {
		color: #fff;
		border-bottom: 1px solid #fff;
		&-userIcon {
			width: 30px;
			height: 30px;
		}
	}
	.input {
		color: #fff !important;
	}
</style>
