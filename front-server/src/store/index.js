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
    depositProducts: [],
    savingProducts: [],
    exchangeRates: []
  },
  getters: {},
  mutations: {
    // 게시글
    GET_ARTICLES(state, newArticle) {
      state.articles = newArticle;
    },
    // 예금 상품 저장
    GET_DEPOSIT_PRODUCTS(state, DPdata) {
      state.depositProducts = DPdata
      console.log(DPdata)
    },
    // 적금 상품 저장
    GET_SAVING_PRODUCTS(state, SPdata) {
      state.savingProducts = SPdata
      console.log(SPdata)
    },
    // 환율 정보 저장
    GET_EX_RATES(state, ERdata) {
      state.exchangeRates = ERdata
      console.log(ERdata)
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
      if (this.state.depositProducts.length === 0) {
        axios.get(`${API_URL}/finlife/deposit-products/`)
        .then((res) => {
          context.commit("GET_DEPOSIT_PRODUCTS", res.data)
        })
        .catch((error) => {
          console.log(error)
          // 에러라면 무조건 데이터가 없는 경우일 것.
          // 저장 시키고 재호출
          axios.get(`${API_URL}/finlife/save-deposit-products/`)
          .then(this.getDepositProducts())
          .catch((err) => {
            console.log(err)
          })
        })
      } else {
        console.log('야금야금')
        return
      }
    },
    // 적금 상품 axios
    getSavingProducts(context) {
      if (this.state.savingProducts.length === 0) {
        axios.get(`${API_URL}/finlife/saving-products/`)
        .then((res) => {
          context.commit("GET_SAVING_PRODUCTS", res.data)
        })
        .catch((error) => {
          console.log(error)
          // 에러라면 무조건 데이터가 없는 경우일 것.
          // 저장 시키고 재호출
          axios.get(`${API_URL}/finlife/save-savings-products/`)
          .then(this.getSavingProducts())
          .catch((err) => {
            console.log(err)
          })
        })
      } else {
        console.log('저끔저끔')
        return
      }
    },
    // 환율 정보 내놔
    getExRates(context) {
      axios.get(`${API_URL}/finlife/save-ex-rate/`)
      .then((res) => {
        context.commit("GET_EX_RATES", res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {},
});