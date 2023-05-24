<template>
  <div>
    <h3>소비 성향 테스트</h3>
    <div v-if="!res">
      <GBTIQuestion :now-stage="stage" @select-answer="choiceEvent" />
    </div>
    <div v-else>
      <GBTIResult :test-score="score" />
    </div>
  </div>
</template>

<script>
import GBTIQuestion from "./GBTIQuestion.vue";
import GBTIResult from "./GBTIResult.vue";

export default {
  name: "GBTIView",
  components: {
    GBTIQuestion,
    GBTIResult,
  },
  data() {
    return {
      stage: 0,
      score: {
        impulse: 0,
        enjoy: 0,
      },
      res: true,
    };
  },
  methods: {
    choiceEvent(data) {
      if (data === "i") {
        this.score.impulse++;
      }
      if (data === "e") {
        this.score.enjoy++;
      }
      if (data === "ie") {
        this.score.impulse++;
        this.score.enjoy++;
      }
      this.stage++;
      if (this.stage === 15) {
        this.res = true;
      }
      console.log("imp:", this.score.impulse, "enj:", this.score.enjoy);
    },
  },
};
</script>

<style></style>
