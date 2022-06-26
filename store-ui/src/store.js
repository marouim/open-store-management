import Vue from "vue";
import Vuex from "vuex";
import storeApi from "./api/storeApi";

Vue.use(Vuex);


const READ_STORE_TREE_OK = "READ_STORE_TREE_OK"


const state = {
  storeTree: [],
  apiCommError: false
};

const mutations = {

  [READ_STORE_TREE_OK](state, data) {
    state.storeTree = data;
    state.ansibleCommunicationError = false;
  }
};

const actions = {
  getStoreTree({ commit }) {
    storeApi.getStoreTree().then((response) => {
      commit(READ_STORE_TREE_OK, response.data);
    });
  },

};

const getters = {
  storeTree() {
    return state.storeTree;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
