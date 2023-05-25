<template>
  <div id="GBTIView" class="container">
    <div v-if="startImage" class="mt-4">
      <img src="@/assets/소비성향테스트이미지.png" @click="startTest()" />
    </div>
    <div v-else class="mt-5 d-flex justify-content-center w-100">
      <div v-if="!res">
        <GBTIQuestion :now-stage="stage" @select-answer="choiceEvent" />
      </div>
      <div v-else>
        <GBTIResult :test-score="score" />
      </div>
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
      startImage: true,
      stage: 0,
      score: {
        impulse: 0,
        enjoy: 0,
      },
      res: false,
    };
  },
  methods: {
    startTest() {
      this.startImage = false;
    },
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
