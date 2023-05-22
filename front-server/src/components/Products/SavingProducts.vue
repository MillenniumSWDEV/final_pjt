<template>
  <div>
    <h4>저끔저끔~!</h4>
    <div v-for="(sp, idx) in savingProducts" :key="idx">
      {{ idx + 1 }} - {{ sp.fin_prdt_nm }}/{{ sp.kor_co_nm }}
      <router-link
        :to="{ name: 'ProductDetailView', params: { id: sp.id, data: sp } }"
      >
        [자세히 보기]
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SavingProducts",
  computed: {
    savingProducts() {
      return this.$store.state.finlife.savingProducts;
    },
  },
};
</script>

<style></style>
