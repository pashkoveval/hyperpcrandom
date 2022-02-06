<template>
	<div class="cerdwrapper pa-1">
		<v-card class="setting">
			<v-img height="40%" class="raletive" :src="VIDEO.thumbnails.maxres.url">
				<v-card-title class="video-title px-3 py-0">
					<p class="pt-5 ma-0">{{ VIDEO.title }}</p>
				</v-card-title>
			</v-img>

			<v-card-text class="pt-1">
				<div class="filters mb-5" v-if="FILTERS">
					<div class="font-weight-bold ml-8">
						Фильтрация по параметрам {{ FILTERS ? ':' : 'отключена' }}
					</div>
					<div class="params" v-for="(param, idx) in FILTERS" :key="idx">
						<div v-if="param.value && param.value.length">
							<div
								v-if="
									typeof param.value === 'string' ||
									typeof param.value === 'number'
								"
							>
								<div class="font-weight-normal">
									<strong>{{ param.des }}</strong>
								</div>
								<div>{{ param.value }}</div>
							</div>
							<div v-else>
								<div class="font-weight-normal">
									<strong>{{ param.des }}</strong>
								</div>
								<div class="d-flex">
									<div
										v-for="(date, idx) in param.value"
										:key="idx"
										class="mr-auto"
									>
										{{ currentDateFormat(date) }}
									</div>
								</div>
							</div>
						</div>
						<div v-else-if="typeof param.value === 'boolean'">
							<div>
								<div class="font-weight-normal">
									<strong>{{ param.des }}</strong>
								</div>
								<div>{{ param.value ? 'Да' : 'Нет' }}</div>
							</div>
						</div>
					</div>
				</div>

				<v-progress-linear
					v-if="procces"
					indeterminate
					color="lime"
					class="pb-5 mb-5"
				>
					Процесс...
				</v-progress-linear>

				<v-btn
					v-else
					outlined
					class="startSort mb-5"
					color="purple"
					@click="findWinner"
				>
					Найти победителя
				</v-btn>

				<v-timeline align-top dense>
					<v-timeline-item
						v-for="(param, idx) in timeline"
						:key="idx"
						:icon="param.icon"
						:color="param.color"
						small
					>
						<div v-if="param.value">
							<div class="font-weight-normal">
								<strong>{{ param.des }}</strong>
							</div>
							<div>{{ param.value }}</div>
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
			procces: true,
			startsTotalComents: null,
			events: [
				{
					des: 'Получение комментариев',
					value: 'получаем...',
					color: 'orange',
					icon: 'mdi-buffer',
					status: 'start',
				},
			],
		}),
		computed: {
			...mapGetters(['VIDEO', 'FILTERS', 'TOTAL_COMENTS']),
			curentEvent() {
				return this.events[this.events.length - 1];
			},
			timeline() {
				return this.events.slice().reverse();
			},
		},
		watch: {
			TOTAL_COMENTS(v) {
				console.log('v', v);
				if (v.status === 'getComments') {
					this.finishGettingComments();
				} else if (v.status === 'startFilteridByText') {
					this.startFilterByText();
				} else if (v.status === 'filteridByText') {
					this.FinishFilterByText();
				} else if (v.status === 'startFilteridByDate') {
					this.startFilterByDate();
				} else if (v.status === 'filteridByDate') {
					this.finishFilterByDate();
				} else if (v.status === 'stopProcces') {
					this.procces = false;
				}
			},
		},
		methods: {
			findWinner() {
				this.$store.dispatch('FIND_WINNER_ACTON');
			},
			startFilterByDate() {
				const startFilterByText = {
					des: 'Фильтрация по дате',
					value: 'фильтруем...',
					color: 'orange',
					icon: 'mdi-buffer',
					status: 'filterDate',
				};
				this.updateTimLine(startFilterByText);
			},
			startFilterByText() {
				const startFilterByText = {
					des: 'Фильтрация по содержанию',
					value: 'фильтруем...',
					color: 'orange',
					icon: 'mdi-buffer',
					status: 'filterText',
				};
				this.updateTimLine(startFilterByText);
			},
			finishFilterByDate() {
				const timeStamp = this.events.find((el) => el.status === 'filterDate');
				if (timeStamp) {
					this.startsTotalComents = this.TOTAL_COMENTS.value;
					timeStamp.des = 'Фильтрация по дате завершина';
					timeStamp.value = `всего ${this.startsTotalComents} комментариев осталось`;
					timeStamp.color = 'green';
					timeStamp.icon = 'mdi-star';
				}
			},
			FinishFilterByText() {
				const timeStamp = this.events.find((el) => el.status === 'filterText');
				if (timeStamp) {
					this.startsTotalComents = this.TOTAL_COMENTS.value;
					timeStamp.des = 'Фильтрация по содержанию завершина';
					timeStamp.value = `всего ${this.startsTotalComents} комментария осталось`;
					timeStamp.color = 'green';
					timeStamp.icon = 'mdi-star';
				}
			},
			finishGettingComments() {
				const timeStamp = this.events.find((el) => el.status === 'start');
				if (timeStamp) {
					this.startsTotalComents = this.TOTAL_COMENTS.value;
					timeStamp.des = 'комментарии получены';
					timeStamp.value = `всего ${this.startsTotalComents} комментария`;
					timeStamp.color = 'green';
					timeStamp.icon = 'mdi-star';
				}
			},
			updateTimLine(v) {
				this.events.push(v);
			},
			currentDateFormat(date) {
				return this.$moment(date).format('DD.MM.YYYY');
			},
		},
	};
</script>

<style lang="scss" scoped>
	.startSort {
		width: 100%;
	}
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
		position: absolute;
		bottom: 0;
		left: 0;
		color: #fff;
		margin: 0;
		background: linear-gradient(
			180deg,
			rgba(34, 193, 195, 0) 0%,
			rgba(0, 0, 0, 1) 100%
		);
		font-size: 14px;
	}
</style>
