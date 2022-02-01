import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '',
    wrongAPIKey: null,
    video: null,
    limitExceededFlag: false,
    limitExceededMsg: 'Ошибка GF6404!!!',
    hyperPCID: 'UCRS-7r-HT7VXZF2ZDVogueg',
    testURL: 'KbyclDTvzU8',
    comments: [],
    subscribers: [],
  },
  mutations: {
    // Проверка сохраненного ключа с прошлой сессии
    CHECK_API_LOCKAL(state) {
      const apiStorage = localStorage.getItem('api');
      const pastDate = localStorage.getItem('date');
      const nowDate = Date.now();
      const pastTime = nowDate - pastDate;

      if (pastTime >= 86400000) {
        state.wrongAPIKey = true;
        localStorage.removeItem('api');
        localStorage.removeItem('date');
      } else {
        if (apiStorage) {
          state.apiKey = apiStorage;
          state.wrongAPIKey = null;
        }
      }
    },
    // Сохранения ключа API
    PUT_API(state, v) {
      state.apiKey = v
    },
    // Сохранения проверенного введенного ключа API в локальное хранилище
    SAVE_CHECKED_API(state) {
      localStorage.setItem('api', state.apiKey);
      localStorage.setItem('date', Date.now());
    },
    // Очистка флага неверно введенного API ключа
    CLEAN_BAD_API_FLAG(state) {
      state.wrongAPIKey = null
    },
    // Сохранение видео по переданной ссылке
    GET_VIDEO(state, v) {
      state.video = v
    },
    // Удаление сохраненного видео
    DELETE_VIDEO(state) {
      state.video = null
    },
    // Валидация серверных ошибок
    SERVER_ERROR_VALIDATEON(state, msg) {
      switch (msg.errors[0].reason) {
        case "quotaExceeded":
          state.limitExceededFlag = true
          state.limitExceededMsg = 'Ошибка GF6404!!!  Лимит запросов на сегодня исчерпан.'
          break;
        case "badRequest":
          state.wrongAPIKey = true
          break;
        default:
          break;
      }
    },
    // Сохранение и очистка коментариев 
    PUSH_COMENTS(state, v) {
      if (v) {
        state.comments = [...state.comments, ...v]
      }
    },
    // Сохранение подписчиков 
    FIND_SUBSCRIBERS_ON_CHENEL(state, v) {
      state.subscribers = [...state.subscribers, v]
    },
  },
  actions: {
    // Вызов проверки сохраненного ключа с прошлой сессии
    CHECK_API_LOCKAL_ACTION({ commit }) {
      commit('CHECK_API_LOCKAL')
    },
    // Вызов очистки флага неверно введенного API ключа
    CLEAN_BAD_API_FLAG_ACTION({ commit }) {
      commit('CLEAN_BAD_API_FLAG')
    },
    // Проверка переданого ключа API если все хорошо вызов сохранения в локальном хранилище
    async TEST_API_KEY_ACTION({ commit }, api, url = 'KbyclDTvzU8') {
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${api}&id=${url}`)
        .then(res => res.json())
        .then(json => {
          commit('SAVE_CHECKED_API')
          if (json.error) {
            commit('SERVER_ERROR_VALIDATEON', json.error)
          } else {
            commit('PUT_API', api)
            commit('SAVE_CHECKED_API')
          }
        })
        .catch(e => {
          throw e
        })
    },
    // Вызов удаления видео
    DELETE_VIDEO_ACTION({ commit }) {
      commit('DELETE_VIDEO')
    },
    // СОхранение ID всех коментаторов
    GET_COMMENTATORS_ID({ state }) {
      const allSubscrubersIds = [];
      const comments = state.comments;
      if (comments.length) {
        comments.forEach(el => {
          allSubscrubersIds.push(el.snippet.topLevelComment.snippet.authorChannelId.value)
        })
      }
      // if (allSubscrubersIds.length) {
      //   allSubscrubersIds.forEach(el => {
      //     dispatch('CHECK_SUBSCRIPTION', el)
      //   })
      // }
    },
    // Проверка подписки коментатора
    async CHECK_SUBSCRIPTION({ state, commit, dispatch }, id, nextPage = '') {
      const apiKey = state.apiKey;
      const currentId = id;
      await fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=100&channelId=${currentId}&key=${apiKey}&pageToken=${nextPage}`)
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            commit('SERVER_ERROR_VALIDATEON', json.error)
          }
          commit('FIND_SUBSCRIBERS_ON_CHENEL', json)
          if (json.nextPageToken) {
            dispatch('CHECK_SUBSCRIPTION', currentId, json.nextPageToken)
          }
        })
        .catch(e => {
          throw e
        })
    },
    // Получение видео
    async GET_VIDEO_ACTION({ commit, state }, videoURL) {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=${url}`)
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            commit('SERVER_ERROR_VALIDATEON', json.error)
            return
          } else {
            commit('GET_VIDEO', json.items[0].snippet)
          }
        })
        .catch(e => {
          throw e
        })
    },
    // Получение коментариев
    async GET_COMENTS_ACTION({ commit, dispatch, state }, videoURL, nextPageToken = '') {
      const apiKey = state.apiKey;
      const url = videoURL
      await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${apiKey}&videoId=${url}&maxResults=100&textFormat=plainText&pageToken=${nextPageToken}`)
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            commit('SERVER_ERROR_VALIDATEON', json.error)
          }
          if (json.nextPageToken) {
            commit('PUSH_COMENTS', json.items)
            dispatch('GET_COMENTS_ACTION', url, json.nextPageToken)
          } else {
            commit('PUSH_COMENTS', json.items)
            // setTimeout(() => {
            //   dispatch('GET_COMMENTATORS_ID')
            // }, 3000)
          }
        })
        .catch(e => {
          throw e
        })

    },
  },
  getters: {
    COMMENTS(state) {
      return state.comments
    },
    VIDEO(state) {
      return state.video
    },
    WRONG_API_KEY(state) {
      return state.wrongAPIKey
    },
    API(state) {
      return state.apiKey
    },
    LIMIT_EXCEEDED(state) {
      return state.limitExceededFlag
    },
    LIMIT_EXCEEDED_MSG(state) {
      return state.limitExceededMsg
    },

  },
})
