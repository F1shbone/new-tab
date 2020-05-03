import Vue from 'vue';
import Vuex from 'vuex';

import bookmarks from './bookmarks';
import hackerNews from './hn';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    bookmarks,
    hackerNews,
  },
});
