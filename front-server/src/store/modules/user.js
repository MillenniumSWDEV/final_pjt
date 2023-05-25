import axios from "axios";
import router from "../../router";

const API_URL = "http://127.0.0.1:8000";

const user = {
  state: {
    userData: null,
    token: null,
    isLogin: false,
  },
  // getters: {
  //   isLogin(state){
  //     return state.token ? true : false
  //   }
  // },
  mutations: {
    // 토큰 저장
    SAVE_TOKEN(state, token) {
      state.token = token;
      state.isLogin = true;
      router.push({ name: "MainPageView" });
    },
    USER_DETAIL(state, userData) {
      state.userData = userData;
    },
    DELETE_USER(state) {
      (state.userData = null), (state.token = null);
    },
    RESET_TOKEN(state) {
      (state.token = null),
        (state.isLogin = false),
        (this.state.finlife.depositCart = null),
        (this.state.finlife.savingCart = null);
      router.push({ name: "MainPageView" });
    },
  },
  actions: {
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
        .catch((err) => {
          alert('아이디 또는 비밀번호를 확인해주세요')
          console.log(err)});
    },
    logout(context) {
      console.log("로그아웃요청들어옴");
      axios({
        method: "POST",
        url: `${API_URL}/accounts/logout/`,
      })
        .then((res) => {
          context.commit("RESET_TOKEN");
        })
        .catch((err) => console.log(err));
    },
    userDetail(context) {
      axios({
        method: "get",
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.state.user.token}`,
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
          Authorization: `Token ${this.state.user.token}`,
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
          Authorization: `Token ${this.state.user.token}`,
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
};

export default user;
