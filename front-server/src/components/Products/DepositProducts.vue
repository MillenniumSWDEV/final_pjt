<template>
  <div>
    <h3>온라인 예금상품 [총 {{ depositProducts.length }}건]</h3>
    <hr />
    <b-card v-for="(dp, idx) in depositProducts" :key="idx">
      <div class="d-flex justify-content-start align-self-center p-2">
        <b-img
          src="./moneyIcon.png"
          width="200px"
          height="200px"
          rounded="circle"
          alt="Rounded image"
          class="my-auto"
        ></b-img>
        <div class="d-flex flex-column my-auto p-5">
          <b-card-text>{{ dp.join_way.split(",").join(" | ") }}</b-card-text>
          <h4>
            <b-card-text> {{ dp.fin_prdt_nm }}/{{ dp.kor_co_nm }} </b-card-text>
          </h4>
          <b-card-text>{{ dp.spcl_cnd }}</b-card-text>
          <div>
            <b-button variant="info">가입하기</b-button>
            <b-button
              class="mx-3"
              @click="goDetailPage({ id: dp.id, data: dp }, event)"
              >상세보기</b-button
            >
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "DepositPoducts",
  components: {},
  computed: {
    depositProducts() {
      return this.$store.state.finlife.depositProducts;
    },
  },
  methods: {
    goDetailPage(params, event) {
      this.$router.push({
        name: "ProductDetailView",
        params: params,
      });
    },
  },
};
</script>

<style></style>
