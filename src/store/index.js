import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: 'AIzaSyCxsZ8BZSASJAtVMps-2zETlPMnf_Esomw',
    video: null,
    nextPageToken: '',
    comments: []
  },
  mutations: {
    newNextPageToken(state, v) {
      state.nextPageToken = v
    },
    getVideo(state, v) {
      state.video = v
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
    async getVideo({ commit, state }, videoURL) {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=${url}`)
        .then(res => res.json())
        .then(json => {
          console.log('json', json);
          commit('getVideo', json.items[0])
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
          // console.log('json', json);
          if (json.nextPageToken) {
            commit('pushComments', json.items)
            commit('newNextPageToken', json.nextPageToken)
            dispatch('getComments', url, json.nextPageToken)
          } else {
            commit('newNextPageToken', null)
            commit('pushComments', json.items)
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
  },
})
