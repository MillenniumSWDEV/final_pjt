<template>
  <div>
    <div>
      <b-card :title="pd.fin_prdt_nm" :sub-title="pd.kor_co_nm">
        <b-row align-h="around">
          <b-col>
            <b-card-text>
              <p>가입대상: {{ pd.join_member }}</p>
              <p>가입 제한: {{ joinDeny[pd.join_deny] }}</p>
              <p>가입 방법: {{ pd.join_way }}</p>
              <p>우대조건: {{ pd.spcl_cnd }}</p>
            </b-card-text>
          </b-col>

          <b-col>
            <!-- 예금 옵션 조건문 -->
            <div v-if="pd.depositoptions_set">
              <div class="mt-3">
                <b-button-group size="sm">
                  <b-button
                    v-for="(option, idx) in pd.depositoptions_set"
                    :key="idx"
                    variant="primary"
                    :pressed="selected === idx"
                    @click="selectTrm(idx)"
                  >
                    {{ option.save_trm }}개월
                  </b-button>
                </b-button-group>
              </div>
              <div v-for="(option, idx) in pd.depositoptions_set" :key="idx">
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
                    v-for="(option, idx) in pd.savingoptions_set"
                    :key="idx"
                    variant="primary"
                    :pressed="selected === idx"
                    @click="selectTrm(idx)"
                  >
                    {{ option.save_trm }}개월
                  </b-button>
                </b-button-group>
              </div>
              <div v-for="(option, idx) in pd.savingoptions_set" :key="idx">
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

        <b-card-text>기타 유의 사항 {{ pd.etc_note }} </b-card-text>
        <!-- <p>마음에 들어 한 사람 수 - {{ pd.carted_user.length }}명</p> -->
        <div v-if="pd.depositoptions_set">
          <b-button
            v-if="
              !$store.state.finlife.depositCart.some((cartedProduct) =>
                Object.values(cartedProduct).includes(pd.fin_prdt_cd)
              )
            "
            variant="info"
            @click="addOrDeleteDepositCart(pd.fin_prdt_cd)"
          >
            추가하기
          </b-button>
          <b-button
            v-else
            variant="danger"
            @click="addOrDeleteDepositCart(pd.fin_prdt_cd)"
            >삭제하기</b-button
          >
        </div>

        <div v-else>
          <b-button
            v-if="
              !$store.state.finlife.savingCart.some((cartedProduct) =>
                Object.values(cartedProduct).includes(pd.fin_prdt_cd)
              )
            "
            variant="info"
            @click="addOrDeleteSavingCart(pd.fin_prdt_cd)"
          >
            추가하기
          </b-button>
          <b-button
            v-else
            variant="danger"
            @click="addOrDeleteSavingCart(pd.fin_prdt_cd)"
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
    pd: Object,
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
  },
  methods: {
    selectTrm(id) {
      this.selected = id;
    },
    addOrDeleteDepositCart(fin_prdt_cd) {
      if (this.isLogin) {
        console.log(fin_prdt_cd);
        this.$store.dispatch("addOrDeleteDepositCart", fin_prdt_cd);
      } else {
        alert("로그인이 필요한 작업입니다.");
      }
    },
    addOrDeleteSavingCart(fin_prdt_cd) {
      if (this.isLogin) {
        console.log(fin_prdt_cd);
        this.$store.dispatch("addOrDeleteSavingCart", fin_prdt_cd);
      } else {
        alert("로그인이 필요한 작업입니다.");
      }
    },
  },
};
</script>

<style></style>
