import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '',
    wrongAPI: null,
    video: null,
    testURL: 'KbyclDTvzU8',
    nextPageToken: '',
    comments: []
  },
  mutations: {
    wrongAPIInput(state, v) {
      state.wrongAPI = v
    },
    putAPI(state, v) {
      state.apiKey = v
    },
    newNextPageToken(state, v) {
      state.nextPageToken = v
    },
    getVideo(state, v) {
      state.video = v
    },
    clearVideo(state) {
      state.video = null
    },
    pushComments(state, v) {
      if (v) {
        state.comments = [...state.comments, ...v]
      } else {
        state.comments = []
      }
    }
  },
  actions: {
    putAPI({ commit, dispatch }, v) {
      commit('putAPI', v)
      dispatch('testAPI', 'KbyclDTvzU8')
    },
    clearVideo({ commit }) {
      commit('clearVideo')
    },
    findSubscriptions({ dispatch, state }) {
      const allUsersID = [];
      state.comments.forEach(el => {
        allUsersID.push(el.snippet.topLevelComment.snippet.authorChannelId.value)
      })
      allUsersID.forEach(el => {
        dispatch('findSubscriptionsOnCanel', el)
      })

    },
    async findSubscriptionsOnCanel({ state, dispatch }, id, nextPage = '') {
      const apiKey = state.apiKey;
      const currentId = id;
      await fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=100&channelId=${currentId}&key=${apiKey}&pageToken=${nextPage}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(json => {
          if (json.nextPageToken) {
            dispatch('findSubscriptionsOnCanel', currentId, json.nextPageToken)
            console.log('json', json.nextPageToken);
          }
          console.log('json', json);
        })
        .catch(e => {
          throw e
        })
    },
    async testAPI({ commit, state }, videoURL) {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=${url}`)
        .then(res => res.json())
        .then(json => {
          if (json.items) {
            commit('wrongAPIInput', false)
          } else {
            commit('wrongAPIInput', true)
          }
        })
        .catch(e => {
          throw e
        })
    },
    async getVideo({ commit, state }, videoURL) {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=${url}`)
        .then(res => res.json())
        .then(json => {
          commit('getVideo', json.items[0].snippet)
        })
        .catch(e => {
          throw e
        })
    },
    async getComments({ commit, dispatch, state }, videoURL, nextPageToken = state.nextPageToken) {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${apiKey}&videoId=${url}&maxResults=100&textFormat=plainText${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`)
        .then(res => res.json())
        .then(json => {
          if (json.nextPageToken) {
            commit('pushComments', json.items)
            commit('newNextPageToken', json.nextPageToken)
            dispatch('getComments', url, json.nextPageToken)
          } else {
            commit('newNextPageToken', null)
            commit('pushComments', json.items)
            setTimeout(() => {
              dispatch('findSubscriptions')
            }, 3000)
          }
        })
        .catch(e => {
          throw e
        })

    },
  },
  getters: {
    NEXT_PAGE_TOKEN(state) {
      return state.nextPageToken
    },
    COMMENTS(state) {
      return state.comments
    },
    VIDEO(state) {
      return state.video
    },
    WRONG_API(state) {
      return state.wrongAPI
    },
    API(state) {
      return state.apiKey
    },

  },
})
