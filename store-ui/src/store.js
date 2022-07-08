import Vue from "vue";
import Vuex from "vuex";
import storeApi from "./api/storeApi";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);


const READ_STORE_TREE_OK = "READ_STORE_TREE_OK"
const READ_LOGS_OK = "READ_LOGS_OK"
const LAUNCH_ACTION_OK = "LAUNCH_ACTION_OK"
const SELECT_STORE = "SELECT_STORE"
const SET_KEYCLOAK = "SET_KEYCLOAK"

const state = {
  storeTree: [],
  logs: [],
  apiCommError: false,
  selectedStoreId: 0,
  keycloak: null,
  jwt_token: null
};

const mutations = {

  [READ_STORE_TREE_OK](state, data) {
    state.storeTree = data;
    state.apiCommError = false;
  },

  [READ_LOGS_OK](state, data) {
    state.logs = data;
    state.apiCommError = false;
  },

  [LAUNCH_ACTION_OK](state) {
    state.apiCommError = false;
  },

  [SELECT_STORE](state, storeId) {
    state.selectedStoreId = storeId;
  },

  [SET_KEYCLOAK](state, keycloak) {
    state.keycloak = keycloak
    state.jwt_token = jwt_decode(keycloak.token)
  }

};

const actions = {
  getStoreTree({ commit }) {
    storeApi.getStoreTree().then((response) => {
      commit(READ_STORE_TREE_OK, response.data);
    });
  },

  getLogs({ commit }) {
    storeApi.getLogs().then((response) => {
      commit(READ_LOGS_OK, response.data);
    });
  },

  launchAction({ commit }, actionId) {
    storeApi.launchAction(actionId).then(() => {
      commit(LAUNCH_ACTION_OK);
    });
  },

  setSelectedStoreId({ commit }, storeId) {
    console.log("Set selected store")
    commit(SELECT_STORE, storeId);
  }
};

const getters = {
  storeTree() {
    return state.storeTree;
  },

  logs() {
    return state.logs;
  },

  selectedStoreId() {
    return state.selectedStoreId;
  },

  keycloak() {
    return state.keycloak
  },

  jwt_token() {
    return state.jwt_token
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
