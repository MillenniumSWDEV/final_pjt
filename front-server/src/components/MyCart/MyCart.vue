<template>
  <div id="MyCart">
    <b-nav class="container mt-3" tabs fill>
      <b-nav-item
        :active="selected"
        style="font-weight: 900; font-size: 22px"
        @click="selectCart(true)"
        >예금 바구니</b-nav-item
      >
      <b-nav-item
        :active="!selected"
        style="font-weight: 900; font-size: 22px"
        @click="selectCart(false)"
        >적금 바구니</b-nav-item
      >
    </b-nav>
    <div class="container" style="height: 700px; overflow: scroll">
      <div v-if="selected" class="mt-3 container">
        <div v-if="depositCart">
          <h3>
            {{ username }}님! 총 {{ depositCart.length }} 개의 상품을
            담았습니다💕
          </h3>
          <hr />
          <div v-for="(item, index) in depositCart" :key="index">
            <DetailProducts :pd="item.id" prdt-type="D" />
            <hr />
          </div>
        </div>
        <h2 v-else>마음에 들어한 예금 상품이 없어요.</h2>
      </div>
      <div v-if="!selected" class="mt-3 container">
        <div v-if="depositCart">
          <h3>
            {{ username }}님! 총 {{ savingCart.length }} 개의 상품을
            담았습니다💕
          </h3>
          <hr />
          <div v-for="(item, index) in savingCart" :key="index">
            <DetailProducts :pd="item.id" prdt-type="S" />
            <hr />
          </div>
        </div>
        <h2 v-else>마음에 들어한 적금 상품이 없어요.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import DetailProducts from "../Products/DetailProducts.vue";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "MyCart",
  components: {
    DetailProducts,
  },
  data() {
    return {
      selected: true,
      username: this.$store.state.user.userData.username,
    };
  },
  computed: {
    depositCart() {
      return this.$store.state.finlife.depositCart;
    },
    savingCart() {
      return this.$store.state.finlife.savingCart;
    },
  },
  created() {
    this.$store.dispatch("getDepositCart");
    this.$store.dispatch("getSavingCart");
  },
  methods: {
    selectCart(tf) {
      this.selected = tf;
    },
  },
};
</script>

<style></style>
