import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import finlife from "./modules/finlife";

const API_URL = "http://127.0.0.1:8000";

const EX_RATE_API_KEY = process.env.VUE_APP_EXRATE_API_KEY;
const EX_RATE_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=" +
  EX_RATE_API_KEY +
  "&data=AP01";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    depositProducts: null,
    savingProducts: null,
    exchangeRates: {
      0: {
        cur_nm: "메이플 메소",
        cur_unit: "MPM",
        ttb: 0.000025,
        tts: 0.000025,
      },
      1: {
        cur_nm: "키보토스 크레딧(100)",
        cur_unit: "KTC",
        ttb: 1000,
        tts: 950,
      },
      2: {
        cur_nm: "키보토스 청휘석",
        cur_unit: "DOL",
        ttb: 15,
        tts: 15,
      },
    },
  },
  getters: {},
  mutations: {
    // 게시글
    GET_ARTICLES(state, newArticle) {
      state.articles = newArticle;
    },
    // 예금 상품 저장
    GET_DEPOSIT_PRODUCTS(state, DPdata) {
      state.depositProducts = DPdata;
      console.log(DPdata);
    },
    // 적금 상품 저장
    GET_SAVING_PRODUCTS(state, SPdata) {
      state.savingProducts = SPdata;
      console.log(SPdata);
    },
    // 환율 정보 저장
    GET_EX_RATES(state, ERdata) {
      state.exchangeRates = ERdata;
      console.log(ERdata);
    },
  },
  actions: {
    // 게시글 axios
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
    // 예금 정보 axios
    getDepositProducts(context) {
      if (!this.state.depositProducts) {
        axios
          .get(`${API_URL}/finlife/deposit-products/`)
          .then((res) => {
            context.commit("GET_DEPOSIT_PRODUCTS", res.data);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("야금야금");
      }
    },
    // 적금 상품 axios
    getSavingProducts(context) {
      if (!this.state.savingProducts) {
        axios
          .get(`${API_URL}/finlife/saving-products/`)
          .then((res) => {
            context.commit("GET_SAVING_PRODUCTS", res.data);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("저끔저끔");
      }
    },
    // 환율 정보 내놔
    getExRates(context) {
      if (!this.state.exchangeRates) {
        axios
          .get(`${API_URL}/finlife/save-ex-rate/`)
          .then((res) => {
            context.commit("GET_EX_RATES", res.data);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("화뉼화뉼");
      }
    },
  },
  modules: {
    finlife,
  },
});
