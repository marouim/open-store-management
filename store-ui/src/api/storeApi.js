import axios from "axios";

const api = {
  baseUrl: "/api/",

  getStoreTree() {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/storetree"
    });
  },

  getLogs() {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/logs"
    });
  },

  launchAction(actionId) {
    return axios({
      method: "POST",
      baseURL: this.baseUrl,
      url: "/launch-action/" + actionId
    });
  },
};

export default api;
