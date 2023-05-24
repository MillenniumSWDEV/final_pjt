<template>
  <div id="ProductsBoard">
    <b-nav class="container mt-3" tabs fill>
      <b-nav-item
        :active="deposit"
        style="font-weight: 900; font-size: 22px"
        @click="depositClick()"
        >온라인 예금상품</b-nav-item
      >
      <b-nav-item
        :active="saving"
        style="font-weight: 900; font-size: 22px"
        @click="savingClick()"
        >온라인 적금상품</b-nav-item
      >
    </b-nav>
    <div v-if="deposit" class="mt-3 container">
      <DepositProducts />
    </div>
    <div v-if="saving" class="mt-3 container">
      <SavingProducts />
    </div>
  </div>
</template>

<script>
import DepositProducts from "./DepositProducts.vue";
import SavingProducts from "./SavingProducts.vue";

export default {
  name: "ProductsBoard",
  components: {
    DepositProducts,
    SavingProducts,
  },
  data() {
    return {
      deposit: true,
      saving: false,
    };
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
    depositClick() {
      this.deposit = true;
      if (this.deposit) {
        this.saving = false;
      }
    },
    savingClick() {
      this.saving = true;
      if (this.saving) {
        this.deposit = false;
      }
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
