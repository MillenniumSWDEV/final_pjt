import axios from "axios";
import router from "../../router";

const API_URL = "http://127.0.0.1:8000";

const finlife = {
  state: {
    depositProducts: [],
    savingProducts: [],
    exchangeRates: [],
    depositCart: [],
    savingCart: [],
  },
  mutations: {
    // 예금 상품 저장
    GET_DEPOSIT_PRODUCTS(state, DPdata) {
      state.depositProducts = DPdata;
    },
    // 적금 상품 저장
    GET_SAVING_PRODUCTS(state, SPdata) {
      state.savingProducts = SPdata;
    },
    // 환율 정보 저장
    GET_EX_RATES(state, ERdata) {
      state.exchangeRates = ERdata;
    },
    GET_DEPOSIT_CART(state, payload) {
      if (payload) {
        state.depositCart = payload;
      }
    },
    GET_SAVING_CART(state, payload) {
      if (payload) {
        state.savingCart = payload;
      }
    },
  },
  actions: {
    // 예금 정보 axios
    getDepositProducts(context, reload) {
      if (!this.state.finlife.depositProducts.length || reload) {
        axios
          .get(`${API_URL}/finlife/deposit-products/`)
          .then((res) => {
            context.commit("GET_DEPOSIT_PRODUCTS", res.data);
          })
          .catch((error) => console.log(error));
      }
    },
    // 적금 상품 axios
    getSavingProducts(context, reload) {
      if (!this.state.finlife.savingProducts.length || reload) {
        axios
          .get(`${API_URL}/finlife/saving-products/`)
          .then((res) => {
            context.commit("GET_SAVING_PRODUCTS", res.data);
          })
          .catch((error) => console.log(error));
      }
    },
    // 환율 정보 내놔
    getExRates(context) {
      if (!this.state.finlife.exchangeRates.length) {
        axios
          .get(`${API_URL}/finlife/save-ex-rate/`)
          .then((res) => {
            context.commit("GET_EX_RATES", res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    // 예금상품 장바구니 목록 불러오기
    getDepositCart(context) {
      axios({
        method: "get",
        url: `${API_URL}/finlife/deposit-products/cart/`,
        headers: {
          Authorization: `Token ${this.state.user.token}`,
          // Authorization : `Token 27032a1c97414bc9dfeb6b134355c88ded581731`
        },
      })
        .then((res) => {
          context.commit("GET_DEPOSIT_CART", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 적금상품 장바구니 목록 불러오기
    getSavingCart(context) {
      axios({
        method: "get",
        url: `${API_URL}/finlife/saving-products/cart/`,
        headers: {
          Authorization: `Token ${this.state.user.token}`,
          // Authorization : `Token 27032a1c97414bc9dfeb6b134355c88ded581731`
        },
      })
        .then((res) => {
          context.commit("GET_SAVING_CART", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 예금상품 장바구니에 추가 혹은 삭제하기
    addOrDeleteDepositCart(context, fin_prdt_cd) {
      if (
        !this.state.finlife.depositCart.some((cartedProduct) =>
          Object.values(cartedProduct).includes(fin_prdt_cd)
        )
      ) {
        axios({
          method: "post",
          url: `${API_URL}/finlife/deposit-product/cart/${fin_prdt_cd}/`,
          headers: {
            Authorization: `Token ${this.state.user.token}`,
            // Authorization : `Token 27032a1c97414bc9dfeb6b134355c88ded581731`
          },
        })
          .then((res) => {
            context.dispatch("getDepositCart");
            context.dispatch("getDepositProducts", true);
            alert("관심목록에 추가되었습니다.");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios({
          method: "delete",
          url: `${API_URL}/finlife/deposit-product/cart/${fin_prdt_cd}/`,
          headers: {
            Authorization: `Token ${this.state.user.token}`,
          },
        })
          .then((res) => {
            context.dispatch("getDepositCart");
            context.dispatch("getDepositProducts", true);
            alert("관심목록에서 삭제되었습니다.");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 적금상품 장바구니에 추가하기
    addOrDeleteSavingCart(context, fin_prdt_cd) {
      if (
        !this.state.finlife.savingCart.some((cartedProduct) =>
          Object.values(cartedProduct).includes(fin_prdt_cd)
        )
      ) {
        axios({
          method: "post",
          url: `${API_URL}/finlife/saving-product/cart/${fin_prdt_cd}/`,
          headers: {
            Authorization: `Token ${this.state.user.token}`,
            // Authorization : `Token 27032a1c97414bc9dfeb6b134355c88ded581731`
          },
        })
          .then((res) => {
            context.dispatch("getSavingCart");
            context.dispatch("getSavingProducts", true);
            alert("관심목록에 추가되었습니다.");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios({
          method: "delete",
          url: `${API_URL}/finlife/saving-product/cart/${fin_prdt_cd}/`,
          headers: {
            Authorization: `Token ${this.state.user.token}`,
          },
        })
          .then((res) => {
            context.dispatch("getSavingCart");
            context.dispatch("getSavingProducts", true);
            alert("관심목록에서 삭제되었습니다.");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};

export default finlife;
