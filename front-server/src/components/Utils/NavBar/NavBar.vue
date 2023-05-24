<template>
  <div id="NavBar" class="container pt-2 my-auto">
    <b-nav class="d-flex align-items-center w-100 justify-content-between">
      <div>
        <b-navbar-brand @click="goMainPage()">
          <img
            src="@/assets/logo.png"
            alt="금융페이지"
            class="d-inline-block align-top"
            width="200px"
          />
        </b-navbar-brand>
      </div>
      <div>
        <b-nav-text class="p-3 ms-5" @click="goBulletinBoard()"
          >게시판</b-nav-text
        >
        <b-nav-text class="p-3" @click="goOnlineProduct()"
          >온라인 상품</b-nav-text
        >
        <b-nav-text class="p-3" @click="goTournament()"
          >금융 심리 테스트</b-nav-text
        >
        <template v-if="isLogin">
          <b-button variant="primary" class="m-3" @click="goMyPage"
            >마이페이지</b-button
          >
          <b-button variant="danger" class="m-3" @click="logout"
            >로그아웃</b-button
          >
        </template>
        <template v-else>
          <b-button variant="primary" class="m-3" @click="goLoginView"
            >로그인</b-button
          >
          <b-button variant="primary" class="m-3" @click="goSignupView"
            >회원가입</b-button
          >
        </template>
      </div>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
  },
  methods: {
    goMainPage() {
      this.$router.push({
        name: "MainPageView",
      });
    },
    goBulletinBoard() {
      this.$router.push({
        name: "BulletinBoardView",
      });
    },
    goOnlineProduct() {
      this.$router.push({
        name: "OnlineProductView",
      });
    },
    goTournament() {
      this.$router.push({
        name: "TestView",
      });
    },
    goLoginView() {
      this.$router.push({
        name: "LoginView",
      });
    },
    goSignupView() {
      this.$router.push({
        name: "SignupView",
      });
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style></style>
