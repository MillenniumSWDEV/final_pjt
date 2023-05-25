<template>
  <div id="DetailProducts" style="margin-top: 20px">
    <div>
      <b-card :header="product.fin_prdt_nm">
        <b-row align-h="around">
          <b-col>
            <b-card-text>
              <p>
                <span style="font-weight: 600; font-size: 18px">가입대상: </span
                >{{ product.join_member }}
              </p>
              <p>
                <span style="font-weight: 600; font-size: 18px"
                  >가입 제한:
                </span>
                {{ joinDeny[product.join_deny] }}
              </p>
              <p>
                <span style="font-weight: 600; font-size: 18px"
                  >가입 방법:
                </span>
                {{ product.join_way }}
              </p>
              <p>
                <span style="font-weight: 600; font-size: 18px"
                  >우대조건:
                </span>
                {{ product.spcl_cnd }}
              </p>
            </b-card-text>
          </b-col>

          <b-col>
            <!-- 예금 옵션 조건문 -->
            <div v-if="product.depositoptions_set">
              <div class="mt-3">
                <b-button-group size="sm">
                  <b-button
                    v-for="(option, idx) in product.depositoptions_set"
                    :key="idx"
                    variant="primary"
                    :pressed="selected === idx"
                    @click="selectTrm(idx)"
                  >
                    {{ option.save_trm }}개월
                  </b-button>
                </b-button-group>
              </div>
              <div
                v-for="(option, idx) in product.depositoptions_set"
                :key="idx"
              >
                <ul v-if="selected === idx">
                  <li>저축 기간: {{ option.save_trm }}개월</li>
                  <li>저축 금리 유형: {{ option.intr_rate_type_nm }}</li>
                  <li>저축 금리: {{ option.intr_rate }}</li>
                  <li>최고 우대금리: {{ option.intr_rate2 }}</li>
                </ul>
              </div>
            </div>

            <!-- 적금 옵션 조건문 -->
            <div v-else>
              <div class="mt-3">
                <b-button-group size="sm">
                  <b-button
                    v-for="(option, idx) in product.savingoptions_set"
                    :key="idx"
                    variant="primary"
                    :pressed="selected === idx"
                    @click="selectTrm(idx)"
                  >
                    {{ option.save_trm }}개월
                  </b-button>
                </b-button-group>
              </div>
              <div
                v-for="(option, idx) in product.savingoptions_set"
                :key="idx"
              >
                <ul v-if="selected === idx">
                  <li style="font-weight: bold">
                    적립 유형: {{ option.rsrv_type_nm }}
                  </li>
                  <li>저축 기간: {{ option.save_trm }}개월</li>
                  <li>저축 금리 유형: {{ option.intr_rate_type_nm }}</li>
                  <li>저축 금리: {{ option.intr_rate }}</li>
                  <li>최고 우대금리: {{ option.intr_rate2 }}</li>
                </ul>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-card-text
          ><span style="font-weight: 900; font-size: 16px"
            >기타 유의 사항
          </span>
          {{ product.etc_note }}
        </b-card-text>
        <p>마음에 들어 한 사람 수 - {{ product.carted_user.length }}명</p>
        <div v-if="product.depositoptions_set">
          <b-button
            v-if="
              !$store.state.finlife.depositCart.some((cartedProduct) =>
                Object.values(cartedProduct).includes(product.fin_prdt_cd)
              )
            "
            variant="info"
            @click="addOrDeleteDepositCart(product.fin_prdt_cd)"
          >
            추가하기
          </b-button>
          <b-button
            v-else
            variant="danger"
            @click="addOrDeleteDepositCart(product.fin_prdt_cd)"
            >삭제하기</b-button
          >
        </div>

        <div v-else>
          <b-button
            v-if="
              !$store.state.finlife.savingCart.some((cartedProduct) =>
                Object.values(cartedProduct).includes(product.fin_prdt_cd)
              )
            "
            variant="info"
            @click="addOrDeleteSavingCart(product.fin_prdt_cd)"
          >
            추가하기
          </b-button>
          <b-button
            v-else
            variant="danger"
            @click="addOrDeleteSavingCart(product.fin_prdt_cd)"
            >삭제하기</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailProducts",
  props: {
    pd: Number,
    prdtType: String,
  },
  data() {
    return {
      selected: null,
      joinDeny: {
        1: "없음",
        2: "서민전용",
        3: "일부제한",
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
    product() {
      if (this.prdtType === "D") {
        return this.$store.state.finlife.depositProducts[this.pd - 1];
      } else {
        return this.$store.state.finlife.savingProducts[this.pd - 1];
      }
    },
  },
  methods: {
    selectTrm(id) {
      this.selected = id;
    },
    addOrDeleteDepositCart(fin_prdt_cd) {
      if (this.isLogin) {
        this.$store.dispatch("addOrDeleteDepositCart", fin_prdt_cd);
      } else {
        alert("로그인이 필요한 작업입니다.");
      }
    },
    addOrDeleteSavingCart(fin_prdt_cd) {
      if (this.isLogin) {
        this.$store.dispatch("addOrDeleteSavingCart", fin_prdt_cd);
      } else {
        alert("로그인이 필요한 작업입니다.");
      }
    },
  },
};
</script>

<style></style>
