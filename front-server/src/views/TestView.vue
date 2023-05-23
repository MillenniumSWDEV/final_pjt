<template>
  <div>
    <h1>금.사.빠 (금융과 사랑에 빠지다.)</h1>
    <div class="fjs">
      <b-button @click="selectTest('tournament')"
        >금융 상품 이상형 월드컵</b-button
      >
      <b-button @click="selectTest('GBTI')">소비 성향 테스트</b-button>
    </div>
    <div>
      <div v-if="selected === 'tournament'" class="m-5">
        <TournamentProducts />
      </div>
      <div v-if="selected === 'GBTI'" class="m-5">
        <GBTITest />
      </div>
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
  data() {
    return {
      selected: null,
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
