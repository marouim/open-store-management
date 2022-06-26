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
  
};

export default api;
