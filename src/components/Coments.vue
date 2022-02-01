<template>
	<div>
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'coments',
		computed: {
			...mapGetters(['COMMENTS']),
		},
	};
</script>

<style lang="scss" scoped></style>
