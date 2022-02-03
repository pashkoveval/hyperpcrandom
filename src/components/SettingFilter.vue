<template>
	<div class="filters mt-5">
		<div class="filters-title mb-5">Параметры фильтрации:</div>
		<v-checkbox
			v-model="inputPhrase"
			dark
			class="ma-0"
			color="purple darken-2"
			:label="
				!inputPhrase
					? 'Проверять коментарий на содержание ?'
					: 'Отменить проверку ?'
			"
			@change="callClearInput"
		/>

		<v-text-field
			v-if="inputPhrase"
			v-model="includText"
			dark
			outlined
			required
			color="purple darken-2"
			:rules="includTextRules"
			label="Введи что дожен содержать коментарий..."
		>
			<template v-slot:append>
				<v-fade-transition leave-absolute>
					<v-btn v-if="includText" icon @click="clearInput">
						<v-icon size="20px">mdi-close-circle-outline</v-icon>
					</v-btn>
				</v-fade-transition>
			</template>
		</v-text-field>

		<v-row>
			<v-col cols="6">
				<v-checkbox
					v-model="inputDate"
					dark
					class="ma-0"
					color="purple darken-2"
					:label="dateLabel"
				></v-checkbox>
			</v-col>
			<v-col cols="6">
				<v-btn
					v-if="dates && dates.length && inputDate"
					dark
					outlined
					width="100%"
					color="purple darken-2"
					@click="clearDate"
				>
					Очистить ?
				</v-btn>
				<div
					v-else-if="dates && dates.length"
					class="purple mt-1 dateShows py-1"
				>
					с
					{{ currentDateFormat(dates[0]) }}
					{{ dates[1] ? `по ${currentDateFormat(dates[1])} ` : '' }}
				</div>
			</v-col>
		</v-row>

		<v-date-picker
			v-if="inputDate"
			v-model="dates"
			range
			full-width
			dark
			locale="RU"
			no-title
			reactive
			scrollable
			landscape
			:rules="dateRules"
			color="purple darken-2"
			class="date"
		></v-date-picker>

		<v-btn
			dark
			outlined
			width="100%"
			color="purple darken-2"
			@click="toComments"
		>
			Перейти к коментариям?
		</v-btn>
	</div>
</template>

<script>
	export default {
		name: 'settings-filter',
		data() {
			return {
				valid: true,
				inputDate: false,
				inputPhrase: false,
				includText: '',
				dates: [],
				dateRules: [(v) => !!v || 'Опять про даты забыл ?'],
				includTextRules: [
					(v) =>
						!!v ||
						'Артём!!!🤬🤬🤬 Пустые коментарии не допустимы! Ну или отключи эту проверку  😇',
				],
			};
		},
		computed: {
			dateLabel() {
				if (!this.dates.length && !this.inputDate) {
					return 'Выбрать дату ?';
				} else if (!this.dates.length && this.inputDate) {
					return 'Выбери дату';
				} else if (this.dates.length && this.inputDate) {
					return 'Скрыть выбор даты ?';
				}
				return 'Выбранная дата: ';
			},
		},
		watch: {
			dates(v) {
				if (v.length > 1) {
					this.checkDatesEqvl();
				}
			},
		},
		methods: {
			toComments() {
				if (this.dates) {
					this.$store.dispatch('SAVE_FILTRED_DATE_ACTION', this.dates);
				}
				if (this.includText) {
					this.$store.dispatch('SAVE_INCLUDED_TEXT_ACTION', this.includText);
				}
				this.$store.dispatch('SHOW_COMMENTS_ACTION');
			},
			checkDatesEqvl() {
				if (
					this.currentDateFormat(this.dates[0]) >
					this.currentDateFormat(this.dates[1])
				) {
					this.dates = [this.dates[1], this.dates[0]];
				}
			},
			currentDateFormat(date) {
				return this.$moment(date).format('DD.MM.YYYY');
			},
			clearDate() {
				this.dates = [];
			},
			clearInput() {
				this.includText = '';
			},
			callClearInput(v) {
				if (!v) {
					this.clearInput();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.filters {
		&-title {
			color: #fff;
			font-size: 30px;
		}
	}
	.dateShows {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
</style>
