import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
  },
  getters: {},
  mutations: {
    GET_ARTICLES(state, newArticle) {
      state.articles = newArticle;
    },
  },
  actions: {
    getArticles(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/`,
      })
        .then((res) => {
          context.commit("GET_ARTICLES", res.data);
        })
        .catch((err) => {
          console.log(err);
          // 404 싫어요
          context.commit("GET_ARTICLES", []);
        });
    },
  },
  modules: {},
});
