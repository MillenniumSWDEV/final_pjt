<template>
  <div>
    <h1>Products</h1>
    <div class="container">
      <div class="box">
        <DepositProducts />
      </div>
      <div class="box">
        <SavingProducts />
      </div>
    </div>
  </div>
</template>

<script>
import DepositProducts from "./DepositProducts.vue";
import SavingProducts from "./SavingProducts.vue";

export default {
  name: "ProductsView",
  components: {
    DepositProducts,
    SavingProducts,
  },
  created() {
    this.getDepositProducts();
    this.getSavingProducts();
  },
  methods: {
    getDepositProducts() {
      this.$store.dispatch("getDepositProducts");
    },
    getSavingProducts() {
      this.$store.dispatch("getSavingProducts");
    },
  },
};
</script>

<style>
.container {
  display: flex;
}

.box {
  width: 50%;
  height: 100%;
  background-color: #f2aeb1;
  border: 1px solid white;
}
</style>
