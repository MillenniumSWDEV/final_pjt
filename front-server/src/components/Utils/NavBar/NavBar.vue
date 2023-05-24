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
      <div class="d-flex">
        <b-nav-item
          class="p-3 ms-5"
          style="color: black"
          :class="{ activeMenu: boardActive }"
          @click="goBulletinBoard()"
          >게시판</b-nav-item
        >
        <b-nav-item
          class="p-3"
          :class="{ activeMenu: productActive }"
          @click="goOnlineProduct()"
          >온라인 상품</b-nav-item
        >
        <b-nav-item
          class="p-3"
          :class="{ activeMenu: finTestActive }"
          @click="goTournament()"
          >금융 심리 테스트</b-nav-item
        >
        <b-nav-item
          class="p-3"
          :class="{ activeMenu: cartActive }"
          @click="goMyCart()"
          >장바구니</b-nav-item
        >
        <template v-if="isLogin">
          <b-button variant="primary" class="m-3" @click="goMyPage()"
            >마이페이지</b-button
          >
          <b-button variant="danger" class="m-3" @click="logout()"
            >로그아웃</b-button
          >
        </template>
        <template v-else>
          <b-button variant="primary" class="m-3" @click="goLoginView()"
            >로그인</b-button
          >
          <b-button variant="primary" class="m-3" @click="goSignupView()"
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
  data() {
    return {
      boardActive: false,
      productActive: false,
      finTestActive: false,
      cartActive: false,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
  },
  methods: {
    goMainPage() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = false;
      this.cartActive = false;
      this.$router.push({
        name: "MainPageView",
      });
    },
    goBulletinBoard() {
      this.boardActive = true;
      this.productActive = false;
      this.finTestActive = false;
      this.cartActive = false;
      this.$router.push({
        name: "BulletinBoardView",
      });
    },
    goOnlineProduct() {
      this.boardActive = false;
      this.productActive = true;
      this.finTestActive = false;
      this.cartActive = false;
      this.$router.push({
        name: "OnlineProductView",
      });
    },
    goTournament() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = true;
      this.cartActive = false;
      this.$router.push({
        name: "FinTestView",
      });
    },
    goMyCart() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = false;
      this.cartActive = true;
      this.$router.push({
        name: "MyCartView",
      });
    },
    goLoginView() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = false;
      this.cartActive = true;
      this.$router.push({
        name: "LoginView",
      });
    },
    goSignupView() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = false;
      this.cartActive = false;
      this.$router.push({
        name: "SignupView",
      });
    },
    goMyPage() {
      this.boardActive = false;
      this.productActive = false;
      this.finTestActive = false;
      this.$router.push({
        name: "MyPageView",
      });
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.activeMenu {
  font-weight: 900;
  font-size: 20px;
}

.activeMenu > a {
  color: #0067ac;
}

.nav-link {
  color: black;
  font-weight: 900;
}
</style>
