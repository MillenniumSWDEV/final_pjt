<template>
  <div class="MainPageView">
    <b-nav>
      <b-navbar-brand href="#">
        <img
          src="../assets/logo.jpg"
          alt="금융페이지"
          class="d-inline-block align-top"
          width="150px"
        />
      </b-navbar-brand>
      <b-nav-item active>개인</b-nav-item>
      <b-nav-item>금융상품</b-nav-item>
      <b-nav-item>게시판</b-nav-item>
      <b-nav-item>고객센터</b-nav-item>
    </b-nav>
    <BulletinBoards />
    <ProductsBoard />
  </div>
</template>

<script>
import BulletinBoards from "../components/BulletinBoards/BulletinBoards.vue";
import ProductsBoard from "@/components/Products/ProductsBoard.vue";

export default {
  components: {
    BulletinBoards,
    ProductsBoard,
  },
};
</script>

<style></style>
