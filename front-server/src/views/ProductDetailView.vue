<template>
  <div>
    <!-- 공통 옵션 -->
    <h3>상품 상세</h3>
    <p>상품명: {{ pd.fin_prdt_nm }} - {{ pd.kor_co_nm }}</p>
    <p>가입대상: {{ pd.join_member }}</p>
    <div>
      <p v-if="pd.join_deny === 1">가입 제한: 없음</p>
      <p v-if="pd.join_deny === 2">가입 제한: 서민전용</p>
      <p v-if="pd.join_deny === 3">가입 제한: 일부제한</p>
    </div>
    <p>가입 방법: {{ pd.join_way }}</p>
    <p>우대조건: {{ pd.spcl_cnd }}</p>

    <!-- 예금 옵션 조건문 -->
    <div v-if="pd.depositoptions_set">
      <ul v-for="option in pd.depositoptions_set" :key="option.id">
        <li>저축 기간: {{ option.save_trm }}개월</li>
        <li>저축 금리 유형: {{ option.intr_rate_type_nm }}</li>
        <li>저축 금리: {{ option.intr_rate }}</li>
        <li>최고 우대금리: {{ option.intr_rate2 }}</li>
      </ul>
    </div>

    <!-- 적금 옵션 조건문 -->
    <div v-else>
      <ul v-for="option in pd.savingoptions_set" :key="option.id">
        <li style="font-weight: bold">적립 유형: {{ option.rsrv_type_nm }}</li>
        <li>저축 기간: {{ option.save_trm }}개월</li>
        <li>저축 금리 유형: {{ option.intr_rate_type_nm }}</li>
        <li>저축 금리: {{ option.intr_rate }}</li>
        <li>최고 우대금리: {{ option.intr_rate2 }}</li>
      </ul>
    </div>
    <p>기타 유의 사항 {{ pd.etc_note }}</p>
    <p>마음에 들어 한 사람 수 - {{ pd.carted_user.length }}명</p>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ProductDetailView",
  computed: {
    pd() {
      return this.$route.params.data;
    },
  },
};
</script>

<style></style>
