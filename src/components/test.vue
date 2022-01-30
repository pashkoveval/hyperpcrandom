<template>
	<v-container>
		<v-row>
			<v-col>
				<v-text-field
					v-model="getURL"
					outlined
					clearable
					dark
					label="Введи ID видео"
					class="input"
				/>
			</v-col>
			<v-col>
				<v-btn dark outlined>Рандом</v-btn>
			</v-col>
		</v-row>
		<v-row v-for="coment in COMMENTS" :key="coment.id" class="comment">
			<v-col cols="3">
				<v-img
					:src="coment.snippet.topLevelComment.snippet.authorProfileImageUrl"
					class="comment-userIcon mb-2"
				/>
				<v-btn
					dark
					outlined
					:href="`${coment.snippet.topLevelComment.snippet.authorChannelUrl}/about`"
					target="_blank"
					>Связаться</v-btn
				>
			</v-col>
			<v-col cols="9">
				<div class="d-flex flex-column">
					<span class="mb-2">
						{{ coment.snippet.topLevelComment.snippet.authorDisplayName }}
					</span>
					<span>
						{{ coment.snippet.topLevelComment.snippet.textDisplay }}
					</span>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'test',
		data: () => ({
			url: null,
		}),
		computed: {
			...mapGetters(['NEXT_PAGE_TOKEN', 'COMMENTS']),
			getURL: {
				get() {
					return this.url;
				},
				set(v) {
					this.url = v;
					this.$store.dispatch('getVideo', v);
					this.$store.dispatch('getComments', v);
				},
			},
		},
		methods: {
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
