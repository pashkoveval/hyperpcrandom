<template>
	<v-form ref="form" v-model="valid" lazy-validation class="mt-5">
		<v-checkbox
			v-model="inputPhrase"
			dark
			class="ma-0"
			color="purple darken-2"
			:label="
				!inputPhrase
					? 'Проверять коментарий на конкретное вырожение ?'
					: 'Отменить проверку ?'
			"
		></v-checkbox>

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
					:label="!inputDate ? 'Выбрать дату ?' : 'Скрыть дату ?'"
				></v-checkbox>
			</v-col>
			<v-col cols="6">
				<v-btn
					v-if="inputDate"
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
					{{ dates[0] }} - {{ dates[1] }}
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
	</v-form>
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
		methods: {
			clearDate() {
				this.dates = [];
			},
			clearInput() {
				this.includText = '';
			},
			validate() {
				this.$refs.form.validate();
			},
			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dateShows {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
