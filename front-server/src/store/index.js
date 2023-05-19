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
  },
  getters: {},
  mutations: {
    GET_ARTICLES(state, newArticle) {
      state.articles = newArticle;
    },
    GET_DEPOSIT_PRODUCTS(state, DPdata) {
      state.depositProducts = DPdata
      console.log(DPdata)
    },
    GET_SAVING_PRODUCTS(state, SPdata) {
      state.savingProducts = SPdata
      console.log(SPdata)
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
    getDepositProducts(context) {
      if (this.state.depositProducts.length === 0) {
        axios.get(`${API_URL}/finlife/deposit-products/`)
        .then((res) => {
          context.commit("GET_DEPOSIT_PRODUCTS", res.data)
        })
        .catch((error) => {
          console.log(error)
          // 에러라면 무조건 데이터가 없는 경우일 것.
          // 다시 한 번 받아와서 또 호출하면 그만이양
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
    getSavingProducts(context) {
      if (this.state.savingProducts.length === 0) {
        axios.get(`${API_URL}/finlife/saving-products/`)
        .then((res) => {
          context.commit("GET_SAVING_PRODUCTS", res.data)
        })
        .catch((error) => {
          console.log(error)
          // 에러라면 무조건 데이터가 없는 경우일 것.
          // 다시 한 번 받아와서 또 호출하면 그만이양
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
  },
  modules: {},
});
