<template>
  <div id="NavBar" class="container pt-2">
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
        <b-nav-text class="p-3">금융 심리 테스트</b-nav-text>
        <b-nav-text class="p-3">마이페이지</b-nav-text>
        <b-button variant="primary" class="m-3">로그인</b-button>
      </div>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
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
  },
};
</script>

<style></style>
