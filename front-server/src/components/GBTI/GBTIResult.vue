<template>
  <div>
    <h1>검사 결과</h1>
    <p>대충 사진</p>
    <div>당신은 {{ result }}</div>
    <p>대충 결과에 맞는 글</p>
    <p>대충 추천 상품</p>
  </div>
</template>

<script>
export default {
  props: {
    testScore: Object,
  },
  data() {
    return {
      you: null,
    };
  },
  computed: {
    result() {
      if (this.testScore.impulse < 5 && this.testScore.enjoy < 5) {
        return "개미";
      }
      if (this.testScore.impulse > 5 && this.testScore.enjoy < 5) {
        return "소확행";
      }
      if (this.testScore.impulse < 5 && this.testScore.enjoy > 5) {
        return "정승";
      } else {
        return "배짱이";
      }
    },
  },
};
</script>

<style></style>
