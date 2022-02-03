<template>
	<v-card class="ma-1" outlined dark color="purple darken-3 coment-card">
		<v-list-item three-line>
			<v-list-item-content>
				<div class="text-overline mb-4">
					{{ coment.snippet.topLevelComment.snippet.authorDisplayName }}
				</div>

				<!-- <v-list-item-title class="text-h5 mb-1">
					Дата публикации
					{{ $moment(coment.snippet.topLevelComment.snippet.publishedAt).format('DD.MM.YYYY') }}
				</v-list-item-title> -->
				<v-list-item-subtitle>
					<div class="d-flex flex-column">
						<span class="mb-2">
							<v-icon>mdi-thumb-up-outline</v-icon>
							{{ coment.snippet.topLevelComment.snippet.likeCount }}
						</span>
						<span> Дата публикации: </span>
						<span>
							{{
								$moment(
									coment.snippet.topLevelComment.snippet.publishedAt
								).format('h:mm, DD.MM.YYYY')
							}}
						</span>
					</div>
				</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-avatar size="80" color="grey">
				<v-img
					:src="coment.snippet.topLevelComment.snippet.authorProfileImageUrl"
				/>
			</v-list-item-avatar>
		</v-list-item>

		<v-card-actions class="d-flex justify-space-between">
			<v-btn
				outlined
				rounded
				text
				:href="`${coment.snippet.topLevelComment.snippet.authorChannelUrl}/about`"
				target="_blank"
			>
				Перейти на канал
			</v-btn>

			<v-tooltip bottom v-if="!showFoolComment">
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" @click="expand = !expand">
						<v-icon>
							{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
						</v-icon>
					</v-btn>
				</template>
				<span>
					{{ !expand ? 'Показать коментарий' : 'Скрыть коментарий' }}
				</span>
			</v-tooltip>
		</v-card-actions>
		<v-expand-transition>
			<div v-show="expand">
				<v-divider></v-divider>

				<v-card-text>
					{{ coment.snippet.topLevelComment.snippet.textDisplay }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
	export default {
		name: 'coment-card',
		props: {
			coment: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				showFoolComment: false,
				expand: false,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.coment-card {
		width: 45%;
		@media (min-width: 1265px) {
			width: 300px;
		}
	}
</style>
