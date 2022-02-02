<template>
	<v-row>
		<v-col cols="6">
			<v-fade-transition leave-absolute>
				<ErrorAlert v-if="ERROR_MSG" />
			</v-fade-transition>
			<VideoInput />
			<SettingFilter v-if="VIDEO" />
		</v-col>
		<v-col cols="6">
			<v-fade-transition leave-absolute>
				<Video v-if="VIDEO" :video="VIDEO" />
			</v-fade-transition>
		</v-col>
	</v-row>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Video from './Video.vue';
	import ErrorAlert from './ErrorAlert.vue';
	import VideoInput from './ViseoURLInput.vue';
	import SettingFilter from './SettingFilter.vue';

	export default {
		name: 'select-video',
		components: {
			Video,
			VideoInput,
			ErrorAlert,
			SettingFilter,
		},
		computed: {
			...mapGetters(['VIDEO', 'BAD_URL', 'ERROR_MSG']),
		},
	};
</script>

<style lang="scss" scoped></style>
