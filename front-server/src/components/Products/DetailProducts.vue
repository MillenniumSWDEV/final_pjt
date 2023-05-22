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
              <div v-for="option in pd.depositoptions_set" :key="option.id">
                <button @click="selectTrm(option.id)">{{ option.save_trm }}</button>
                <ul v-if="selected === option.id">
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
                  <b-button variant="primary" v-for="(option, idx) in pd.savingoptions_set" :key="idx" @click="selectTrm(idx)" :pressed="selected === idx">
                    {{ option.save_trm }}개월
                  </b-button>
                </b-button-group>
              </div>
              <div v-for="(option, idx) in pd.savingoptions_set" :key="idx">
                <ul v-if="selected === idx">
                  <li style="font-weight: bold">적립 유형: {{ option.rsrv_type_nm }}</li>
                  <li>저축 기간: {{ option.save_trm }}개월</li>
                  <li>저축 금리 유형: {{ option.intr_rate_type_nm }}</li>
                  <li>저축 금리: {{ option.intr_rate }}</li>
                  <li>최고 우대금리: {{ option.intr_rate2 }}</li>
                </ul>
              </div>
            </div>
          </b-col>

        </b-row>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </div>
    <!-- 공통 옵션 -->
    <h3></h3>

    
    

    <p>기타 유의 사항 {{ pd.etc_note }}</p>
    <p>마음에 들어 한 사람 수 - {{ pd.carted_user.length }}명</p>
    <hr />
  </div>
</template>

<script>
export default {
  name: "DetailProducts",
  computed: {
    pd() {
      return this.$route.params.data;
    },
  },
  data() {
    return {
      selected: null,
      joinDeny: {
        1: '없음',
        2: '서민전용',
        3: '일부제한'
      },
    }
  },
  methods: {
    selectTrm(id) {
      this.selected = id
    }
  }
};
</script>

<style></style>
