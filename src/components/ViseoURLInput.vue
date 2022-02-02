<template>
	<div class="wrapper">
		<v-scale-transition leave-absolute>
			<v-text-field
				v-if="!VIDEO"
				v-model="url"
				dark
				outlined
				color="purple darken-2"
				label="Введи ссылку видео"
				class="input"
				hide-details
				@keyup.enter="getURL"
			>
				<template v-slot:append>
					<v-fade-transition leave-absolute>
						<v-btn v-if="url" icon @click="clearInput">
							<v-icon size="20px">mdi-close-circle-outline</v-icon>
						</v-btn>
					</v-fade-transition>
					<v-fade-transition leave-absolute>
						<v-btn v-if="url.length > 32" icon @click="getURL">
							<v-icon size="30px">mdi-language-go</v-icon>
						</v-btn>
					</v-fade-transition>
				</template>
			</v-text-field>
		</v-scale-transition>
		<v-scale-transition leave-absolute>
			<v-btn v-if="VIDEO" outlined color="purple darken-2" @click="deleteVideo">
				Выбрать другое видео ?
			</v-btn>
		</v-scale-transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'video-input-url',
		data() {
			return {
				url: '',
			};
		},
		computed: {
			...mapGetters(['ERROR_MSG', 'VIDEO']),
		},
		methods: {
			deleteVideo() {
				this.$store.dispatch('DELETE_VIDEO_ACTION');
			},
			getURL() {
				const url = this.url.substr(32, this.url.length);
				if (url) {
					this.$store.dispatch('GET_VIDEO_ACTION', url);
				}
			},
			clearInput() {
				this.url = '';
				if (this.ERROR_MSG) {
					setTimeout(() => {
						this.$store.dispatch('CLEAN_ERROS_MSG_ACTION');
					}, 1000);
				}
			},
		},
	};
</script>

<style lang="scss">
	.v-input .v-input__control .v-input__slot .v-input__append-inner {
		margin-top: 10px;
	}

	.input {
		font-size: 14px !important;
		max-width: 100%;
		color: #fff !important;
	}
</style>
