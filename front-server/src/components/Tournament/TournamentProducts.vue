<template>
  <div>
    <h3>금사빠 (금융과 사랑에 빠지다)</h3>
    <b-button-group size="sm">
      <b-button
        variant="primary"
        :pressed="selected === '예금'"
        @click="select('예금')"
      >
        예금
      </b-button>
      <b-button
        variant="primary"
        :pressed="selected === '적금'"
        @click="select('적금')"
      >
        적금
      </b-button>
    </b-button-group>
    <b-button variant="danger" @click="next"
      >{{ roundCnt }}강 시작하기</b-button
    >
    <p v-if="!complete">{{ next_round.length }} / {{ roundCnt / 2 }}</p>
    <div align="center" justify="center" style="display: flex">
      <div cols="6" align="center" style="width: 370px">
        <TournamentChoice id="left" :prdt="left" @choice-event="leftChoice" />
      </div>
      <div cols="6" align="center" style="width: 370px">
        <TournamentChoice
          id="right"
          :prdt="right"
          @choice-event="rightChoice"
        />
      </div>
      <br />
    </div>

    <div v-if="complete">
      <h1>우승!</h1>
      <hr />
      <v-row align="center" justify="center">
        <v-col cols="6">
          <p>{{ winner.fin_prdt_nm }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TournamentChoice from "./TournamentChoice.vue";

export default {
  name: "TournamentView",
  components: {
    TournamentChoice,
  },
  data() {
    return {
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
    // 버튼을 누름에 따라 32개의 상품이 무작위로 products에 들어가게 됩니다.
    select(v) {
      this.selected = v;
      this.next_round = [];
      this.roundCnt = 32;
      this.complete = false;
      if (v === "예금") {
        this.products = [...this.$store.state.finlife.depositProducts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 32);
        console.log(this.products);
      }
      if (v === "적금") {
        this.products = [...this.$store.state.finlife.savingProducts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 32);
        console.log(this.products);
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
        alert("선택해 당장");
      } else {
        if (
          this.products.length === 0 ||
          this.products.length === 32 ||
          n === true
        ) {
          this.left = this.products.pop();
          this.right = this.products.pop();
        }
        console.log(this.next_round);
        console.log(this.products);
      }
    },
  },
};
</script>

<style></style>
