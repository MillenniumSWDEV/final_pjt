import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import finlife from "./modules/finlife";
import user from "./modules/user";
import article from "./modules/article";

const API_URL = "http://127.0.0.1:8000";

const EX_RATE_API_KEY = process.env.VUE_APP_EXRATE_API_KEY;
const EX_RATE_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=" +
  EX_RATE_API_KEY +
  "&data=AP01";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    finlife,
    article,
    user,
  },
});
