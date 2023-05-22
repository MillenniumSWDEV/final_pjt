<template>
  <div>
    <div class="container-lg">
      <DepositProducts />
    </div>
    <div class="container">
      <SavingProducts />
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
  border: 1px solid white;
}
</style>
