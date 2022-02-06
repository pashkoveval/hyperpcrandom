<template>
	<div>
		<v-fade-transition leave-absolute>
			<div v-if="!SHOW_COMMETS_FLAG" class="d-flex">
				<v-flex sm8>
					<v-fade-transition leave-absolute>
						<ErrorAlert v-if="ERROR_MSG" />
					</v-fade-transition>
					<VideoInput />
					<SettingFilter v-if="VIDEO" />
				</v-flex>
				<v-flex sm4>
					<v-fade-transition leave-absolute>
						<Video v-if="VIDEO" :video="VIDEO" />
					</v-fade-transition>
				</v-flex>
			</div>
		</v-fade-transition>
		<v-fade-transition leave-absolute>
			<Coments v-if="SHOW_COMMETS_FLAG" />
		</v-fade-transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Video from './Video.vue';
	import ErrorAlert from './ErrorAlert.vue';
	import VideoInput from './ViseoURLInput.vue';
	import SettingFilter from './SettingFilter.vue';
	import Coments from './Coments.vue';

	export default {
		name: 'select-video',
		components: {
			Video,
			Coments,
			VideoInput,
			ErrorAlert,
			SettingFilter,
		},
		computed: {
			...mapGetters(['VIDEO', 'BAD_URL', 'ERROR_MSG', 'SHOW_COMMETS_FLAG']),
		},
	};
</script>

<style lang="scss" scoped></style>
