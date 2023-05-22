<template>
  <div>
    <h4>예금예금~!</h4>
    <div v-for="(dp, idx) in depositProducts" :key="idx">
      {{ idx + 1 }} - {{ dp.fin_prdt_nm }}/{{ dp.kor_co_nm }}
      <router-link
        :to="{ name: 'ProductDetailView', params: { id: dp.id, data: dp } }"
      >
        [자세히 보기]
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepositPoducts",
  computed: {
    depositProducts() {
      return this.$store.state.finlife.depositProducts;
    },
  },
};
</script>

<style></style>
