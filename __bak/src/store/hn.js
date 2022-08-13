import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/database';

//#region Firebase setup
const config = {
  databaseURL: 'https://hacker-news.firebaseio.com',
};
firebase.initializeApp(config);

const version = '/v0';
const api = firebase.database();

// /**
//  * Subscribe to real time updates of the top 100 stories,
//  * and cache the IDs locally.
//  */

// api.child('topstories').on('value', snapshot => {
//   topStoryIds = snapshot.val()
//   store.emit('topstories-updated')
// })
//#endregion

const namespaced = true;

const state = () => ({
  data: {
    topStories: [],
    items: {},
  },
  display: {
    itemsPerPage: 12,
    page: 1,
  },
});

const getters = {
  pageTopStoryIds(state) {
    const start = state.display.itemsPerPage * state.display.page;
    return state.data.topStories.slice(
      start,
      start + state.display.itemsPerPage
    );
  },
  pageTopStories(state, getters) {
    return Object.values(state.data.items).filter(
      e => getters.pageTopStoryIds.indexOf(e.id) !== -1
    );
  },
};

const actions = {
  fetchItem: ({ state, commit }, { id }) => {
    return new Promise((resolve, reject) => {
      if (state.data.items[id]) {
        resolve(state.data.items[id]);
      } else {
        api.ref(version + '/item/' + id).once(
          'value',
          snapshot => {
            const story = snapshot.toJSON();
            commit('setStory', { id, story });
            resolve(story);
          },
          reject
        );
      }
    });
  },
  fetchTopStories: ({ commit, getters, dispatch }) => {
    return new Promise((resolve, reject) => {
      api.ref(version + '/topstories').once(
        'value',
        snapshot => {
          const stories = snapshot.val();
          commit('setTopStories', { stories });
          resolve(
            getters.pageTopStoryIds.map(id => dispatch('fetchItem', { id }))
          );
        },
        reject
      );
    });
  },
};

const mutations = {
  setTopStories(state, { stories }) {
    state.data.topStories = stories;
  },
  setStory(state, { id, story }) {
    Vue.set(state.data.items, id, story);
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
