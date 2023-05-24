import axios from "axios";
import router from "../../router";

const API_URL = "http://127.0.0.1:8000";

const finlife = {
  state: {
    depositProducts: null,
    savingProducts: null,
    exchangeRates: null,
  },
  mutations: {
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
    // 예금 정보 axios
    getDepositProducts(context) {
      if (!this.state.finlife.depositProducts) {
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
      if (!this.state.finlife.savingProducts) {
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
      if (!this.state.finlife.exchangeRates) {
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
  },
};

export default finlife;
