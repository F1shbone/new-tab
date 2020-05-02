import Vue from 'vue';
import Vuex from 'vuex';

import hackerNews from './hn';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    hackerNews,
  },
});
