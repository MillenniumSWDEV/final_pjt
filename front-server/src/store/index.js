import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const EX_RATE_API_KEY = process.env.VUE_APP_EXRATE_API_KEY
const EX_RATE_URL = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey='+EX_RATE_API_KEY+'&data=AP01'

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
