<template>
  <div>
    <h4>[deposit Cart]</h4>
    <div v-for="(item, index) in depositCart" :key="index">
      <p>{{ item.kor_co_nm }} / {{ item.fin_prdt_nm }}</p>
      <p>{{ item.etc_note }}</p>
      <p>{{ item.join_member }}</p>
      <p>{{ item.join_way }}</p>
      <p>{{ item.spcl_cnd }}</p>
      <button @click="deleteDPfromCart(item.fin_prdt_cd)">
        장바구니에서빼기
      </button>
      <hr />
    </div>
    <h4>[saving Cart]</h4>
    <div v-for="(item, index) in savingCart" :key="index">
      <p>{{ item.kor_co_nm }} / {{ item.fin_prdt_nm }}</p>
      <p>{{ item.etc_note }}</p>
      <p>{{ item.join_member }}</p>
      <p>{{ item.join_way }}</p>
      <p>{{ item.spcl_cnd }}</p>
      <button @click="deleteSPfromCart(item.fin_prdt_cd)">
        장바구니에서빼기
      </button>
      <hr />
    </div>
  </div>
</template>

<script>
const API_URL = "http://127.0.0.1:8000";

export default {
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
    deleteDPfromCart(fin_prdt_cd) {
      this.$store.dispatch("deleteDPfromCart", fin_prdt_cd);
    },
    deleteSPfromCart(fin_prdt_cd) {
      this.$store.dispatch("deleteSPfromCart", fin_prdt_cd);
    },
  },
};
</script>

<style></style>
