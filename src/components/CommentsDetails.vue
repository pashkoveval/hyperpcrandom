<template>
	<div class="cerdwrapper pa-1">
		<v-card class="setting">
			<v-img height="40%" class="" :src="VIDEO.thumbnails.maxres.url">
				<v-card-title class="white--text mt-8 video-title">
					<p class="pt-5">{{ VIDEO.title }}</p>
				</v-card-title>
			</v-img>

			<v-card-text>
				<div class="font-weight-bold ml-8 mb-2">Today</div>

				<v-timeline align-top dense>
					<v-timeline-item
						v-for="message in messages"
						:key="message.time"
						:color="message.color"
						small
					>
						<div>
							<div class="font-weight-normal">
								<strong>{{ message.from }}</strong> @{{ message.time }}
							</div>
							<div>{{ message.message }}</div>
						</div>
					</v-timeline-item>
				</v-timeline>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'comments-details',
		data: () => ({
			messages: [
				{
					from: 'You',
					message: `Sure, I'll see you later.`,
					time: '10:42am',
					color: 'deep-purple lighten-1',
				},
				{
					from: 'John Doe',
					message: 'Yeah, sure. Does 1:00pm work?',
					time: '10:37am',
					color: 'green',
				},
				{
					from: 'You',
					message: 'Did you still want to grab lunch today?',
					time: '9:47am',
					color: 'deep-purple lighten-1',
				},
			],
		}),
		computed: {
			...mapGetters(['VIDEO']),
		},
	};
</script>

<style lang="scss" scoped>
	.cerdwrapper {
		border-radius: 4px;
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
	}
	.video-title {
		background: linear-gradient(
			180deg,
			rgba(34, 193, 195, 0) 0%,
			rgba(0, 0, 0, 1) 100%
		);
		font-size: 14px;
	}
</style>
