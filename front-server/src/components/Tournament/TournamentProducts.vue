<template>
  <div id="TournamentView" class="container">
    <div v-if="startImage" class="mt-3">
      <img src="@/assets/이상형월드컵이미지.png" @click="startTest()" />
    </div>
    <div
      v-else
      class="d-flex flex-column justify-content-center mt-2 mx-auto w-100"
    >
      <h3 style="font-weight: 800; text-align: center; margin-bottom: 30px">
        금사빠 (금융과 사랑에 빠지다)
      </h3>
      <div class="d-flex justify-content-center w-50 mb-3 mx-auto">
        <b-button
          size="lg"
          class="mx-auto me-5"
          style="width: 100px; height: 30px; box-sizing: content-box"
          pill
          variant="primary"
          :pressed="selected === '예금'"
          @click="select('예금')"
        >
          예금
        </b-button>
        <b-button
          size="lg"
          class="mx-auto"
          style="width: 100px; height: 30px; box-sizing: content-box"
          pill
          variant="info"
          :pressed="selected === '적금'"
          @click="select('적금')"
        >
          적금
        </b-button>
      </div>
      <b-button
        variant="success"
        class="mx-auto"
        style="width: 280px; height: 40px"
        @click="next"
        >{{ roundCnt }}강 시작하기</b-button
      >
      <h4 v-if="!complete">{{ next_round.length }} / {{ roundCnt / 2 }}</h4>
      <div align="center" justify="center" style="display: flex">
        <div cols="6" align="center" style="min-width: 500px">
          <TournamentChoice id="left" :prdt="left" @choice-event="leftChoice" />
        </div>
        <div cols="6" align="center" style="min-width: 500px">
          <TournamentChoice
            id="right"
            :prdt="right"
            @choice-event="rightChoice"
          />
        </div>
        <br />
      </div>

      <div v-if="complete">
        <DetailProducts :pd="winner" />
      </div>
    </div>
  </div>
</template>

<script>
import TournamentChoice from "./TournamentChoice.vue";
import DetailProducts from "../Products/DetailProducts.vue";
export default {
  name: "TournamentView",
  components: {
    TournamentChoice,
    DetailProducts,
  },
  data() {
    return {
      startImage: true,
      products: null,
      next_round: [],
      roundCnt: 32,
      selected: null,
      left: null,
      right: null,
      complete: false,
      winner: null,
    };
  },
  watch: {
    //라운드 종료 판별
    left: function () {
      if (this.products.length === 0 && !this.left) {
        this.products = this.next_round.slice(-(this.roundCnt / 2));
        this.next_round = [];
        this.roundCnt = this.products.length;
      }
    },
    right: function () {
      if (
        this.next_round.length === 0 &&
        this.products.length === 1 &&
        !this.left &&
        !this.right
      ) {
        this.winner = this.products.pop();
        this.complete = true;
      }
    },
  },
  methods: {
    startTest() {
      this.startImage = false;
    },
    // 버튼을 누름에 따라 32개의 상품이 무작위로 products에 들어가게 됩니다.
    select(v) {
      this.selected = v;
      this.left = null;
      this.right = null;
      this.next_round = [];
      this.roundCnt = 32;
      this.complete = false;
      if (v === "예금") {
        this.products = [...this.$store.state.finlife.depositProducts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 32);
      }
      if (v === "적금") {
        this.products = [...this.$store.state.finlife.savingProducts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 32);
      }
    },

    leftChoice() {
      this.next_round.push(this.left);
      this.left = null;
      this.right = null;
      this.next(true);
    },

    rightChoice() {
      this.next_round.push(this.right);
      this.left = null;
      this.right = null;
      this.next(true);
    },

    next(n) {
      if (!this.selected) {
        alert("예금과 적금 중에 선택해 당장!!!");
      } else if (
        // 자기 마음대로 넘어가는 현상 및 다음 스테이지로 넘어가지 않는 현상 방지용 조건문
        (this.next_round.length === 0 && this.products.length % 2 === 0) ||
        this.products.length === 32 ||
        n === true
      ) {
        this.left = this.products.pop();
        this.right = this.products.pop();
      }
    },
    winnerSet() {
      this.winner = this.products[17];
    },
  },
};
</script>

<style scoped></style>
