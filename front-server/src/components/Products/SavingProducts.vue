<template>
  <div>
    <h4>온라인 적금상품 [총 {{ savingProducts.length }} 건]</h4>
    <hr />
    <b-card v-for="(sp, idx) in savingProducts" :key="idx">
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
          <b-card-text>{{ sp.join_way.split(",").join(" | ") }}</b-card-text>
          <h4>
            <b-card-text> {{ sp.fin_prdt_nm }}/{{ sp.kor_co_nm }} </b-card-text>
          </h4>
          <b-card-text>{{ sp.spcl_cnd }}</b-card-text>
          <div>
            <b-button variant="info">가입하기</b-button>
            <b-button
              class="mx-3"
              @click="goDetailPage({ id: sp.id, data: sp }, event)"
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
  name: "SavingProducts",
  computed: {
    savingProducts() {
      return this.$store.state.finlife.savingProducts;
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
