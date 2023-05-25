<template>
  <div>
    <b-nav class="container mt-3" tabs fill>
      <b-nav-item
        :active="!selected"
        style="font-weight: 900; font-size: 22px"
        @click="selectTest(false)"
        >금융 상품 월드컵</b-nav-item
      >
      <b-nav-item
        :active="selected"
        style="font-weight: 900; font-size: 22px"
        @click="selectTest(true)"
        >소비 성향 테스트</b-nav-item
      >
    </b-nav>
    <div v-if="selected">
      <TournamentProducts />
    </div>
    <div v-if="!selected">
      <GBTITest />
    </div>
  </div>
</template>

<script>
import GBTITest from "../components/GBTI/GBTITest.vue";
import TournamentProducts from "../components/Tournament/TournamentProducts.vue";

export default {
  name: "TestView",
  components: {
    TournamentProducts,
    GBTITest,
  },
  created() {
    this.selected = this.$route.params?.test
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    selectTest(test) {
      this.selected = test;
    },
  },
};
</script>
<style>
.fjs {
  display: flex;
  justify-content: space-around;
}
</style>
