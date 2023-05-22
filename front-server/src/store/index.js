import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import finlife from "./modules/finlife";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

const API_URL = "http://127.0.0.1:8000";

const EX_RATE_API_KEY = process.env.VUE_APP_EXRATE_API_KEY;
const EX_RATE_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=" +
  EX_RATE_API_KEY +
  "&data=AP01";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userData: null,
    articles: [],
    token: null,
    depositProducts: null,
    savingProducts: null,
    exchangeRates: null,
    // {
    //   0: {
    //     cur_nm: "메이플 메소",
    //     cur_unit: "MPM",
    //     ttb: 0.000025,
    //     tts: 0.000025,
    //   },
    //   1: {
    //     cur_nm: "키보토스 크레딧(100)",
    //     cur_unit: "KTC",
    //     ttb: 1000,
    //     tts: 950,
    //   },
    //   2: {
    //     cur_nm: "키보토스 청휘석",
    //     cur_unit: "DOL",
    //     ttb: 15,
    //     tts: 15,
    //   },
    // },
  },
  getters: {    
    isLogin(state){
      return state.token ? true : false
  }},
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
    // 토큰 저장
    SAVE_TOKEN(state, token) {
      state.token = token;
      router.push({ name: "ArticleView" });
    },
    USER_DETAIL(state, userData) {
      state.userData = userData;
    },
    DELETE_USER(state) {
      (state.userData = null), (state.token = null);
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
          console.log(res.data)
          context.commit("GET_ARTICLES", res.data);
        })
        .catch((err) => {
          console.log(err);
          // 404 싫어요
          context.commit("GET_ARTICLES", []);
        });
    },
    // 게시글 작성
    createArticle(context, payload){
      const title = payload.title
      const content = payload.content

      axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/`,
        data: { title, content },
        headers : {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          router.push({ name: "ArticleView" });
        })
        .catch((err) => {
          console.log(err);
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
            console.log(res);
            context.commit("GET_EX_RATES", res.data);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("화뉼화뉼");
      }
    },
    signUp(context, payload) {
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;
      const email = payload.email;
      const nickname = payload.nickname;
      const job = payload.job;
      const age = payload.age;

      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username,
          password1,
          password2,
          email,
          nickname,
          job,
          age,
        },
      })
        .then((res) => {
          console.log(res.data.key);
          context.commit("SAVE_TOKEN", res.data.key);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      const username = payload.username;
      const password = payload.password;

      axios({
        method: "post",
        url: `${API_URL}/accounts/login/`,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          context.commit("SAVE_TOKEN", res.data.key);
        })
        .catch((err) => console.log(err));
    },
    userDetail(context) {
      axios({
        method: "get",
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((res) => {
          context.commit("USER_DETAIL", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUser(context, payload) {
      const nickname = payload.nickname;
      const job = payload.job;
      const age = payload.age;
      const monthly_expenses = payload.monthly_expenses;
      const preferred_bank = payload.preferred_bank;
      const saving_preference = payload.saving_preference;
      const investment_experience = payload.investment_experience;
      const asset_holdings = payload.asset_holdings;
      const financial_goal = payload.financial_goal;
      const salary = payload.salary;

      axios({
        method: "patch",
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
        data: {
          nickname,
          job,
          age,
          monthly_expenses,
          preferred_bank,
          saving_preference,
          investment_experience,
          asset_holdings,
          financial_goal,
          salary,
        },
      })
        .then((res) => {
          console.log(res.data);
          context.commit("USER_DETAIL", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser(context) {
      axios({
        method: "delete",
        url: `${API_URL}/accounts/user/delete`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          context.commit("DELETE_USER");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
    finlife,
  },
});
