<template>
  <div id="DepositPoducts" style="width: 100%">
    <div v-if="!goDetail">
      <h5>[총 {{ totalRows }}건]</h5>
      <hr />
      <div style="height: 680px">
        <b-card v-for="(dp, idx) in depositProducts" :key="idx">
          <div
            class="d-flex justify-content-start align-self-center px-2"
            style="width: 100%"
          >
            <div class="my-auto mx-auto" style="width: 150px">
              <b-img
                src="./moneyIcon.png"
                width="100px"
                height="100px"
                rounded="circle"
                alt="Rounded image"
              ></b-img>
            </div>
            <div class="d-flex flex-column" style="width: 100%">
              <b-card-text>{{
                dp.join_way.split(",").join(" | ")
              }}</b-card-text>
              <h5 style="font-weight: 900">
                <b-card-text>
                  {{ dp.fin_prdt_nm }}/{{ dp.kor_co_nm }}
                </b-card-text>
              </h5>
              <b-card-text>{{ dp.spcl_cnd }}</b-card-text>
              <div>
                <b-button class="mx-3" @click="listOrDetail(dp)"
                  >상세보기</b-button
                >
                <b-button
                  v-if="
                    !$store.state.finlife.depositCart.some((cartedProduct) =>
                      Object.values(cartedProduct).includes(dp.fin_prdt_cd)
                    )
                  "
                  variant="info"
                  @click="addOrDeleteDepositCart(dp.fin_prdt_cd)"
                >
                  추가하기
                </b-button>
                <b-button
                  v-else
                  variant="danger"
                  @click="addOrDeleteDepositCart(dp.fin_prdt_cd)"
                  >삭제하기</b-button
                >
              </div>
            </div>
          </div>
        </b-card>
      </div>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        first-number
        last-number
        style="justify-content: center"
      ></b-pagination>
    </div>

    <div v-else>
      <b-button @click="listOrDetail">뒤로 가기</b-button>
      <DetailProducts :pd="prdtId" prdt-type="D" />
    </div>
  </div>
</template>

<script>
import DetailProducts from "./DetailProducts.vue";

export default {
  name: "DepositPoducts",
  components: { DetailProducts },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      items: [],
      goDetail: false,
      prdtId: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
    depositProducts() {
      const items = this.$store.state.finlife.depositProducts;

      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    totalRows() {
      return this.$store.state.finlife.depositProducts.length;
    },
  },
  methods: {
    listOrDetail(dp) {
      this.prdtId = dp.id;
      this.goDetail = this.goDetail ? false : true;
    },
    addOrDeleteDepositCart(fin_prdt_cd) {
      if (this.isLogin) {
        this.$store.dispatch("addOrDeleteDepositCart", fin_prdt_cd);
      } else {
        alert("로그인이 필요한 작업입니다.");
      }
    },
  },
};
</script>

<style></style>
