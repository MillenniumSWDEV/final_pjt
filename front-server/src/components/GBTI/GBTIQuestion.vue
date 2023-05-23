<template>
  <div>
    <b-card :title="nowStage + 1 + '. ' + questions[nowStage].q">
      <b-card-text>
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          :value="questions[nowStage].a1"
          :unchecked-value="questions[nowStage].a2"
        >
          네
        </b-form-checkbox>
      </b-card-text>

      <b-card-text>
        <b-form-checkbox
          id="checkbox-2"
          v-model="status"
          name="checkbox-2"
          :value="questions[nowStage].a2"
          :unchecked-value="questions[nowStage].a1"
        >
          아뇨
        </b-form-checkbox></b-card-text
      >

      <b-button variant="primary" @click="selectAnswer">다음</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "GBTIQuestion",
  props: {
    nowStage: Number,
  },
  data() {
    return {
      status: null,
      questions: [
        {
          q: "가계부를 사용한다.",
          a1: "n",
          a2: "i",
        },
        {
          q: "옷을 살 때는 트렌드에 맞게 구매한다.",
          a1: "i",
          a2: "n",
        },
        {
          q: "디자인이 같은 옷이라면 브랜드가 있는 옷을 선호한다.",
          a1: "i",
          a2: "n",
        },
        {
          q: "'한정판'이라는 단어는 항상 나의 심금을 울린다.",
          a1: "ie",
          a2: "n",
        },
        {
          q: "비싼 것은 그 만한 가치가 있다고 생각한다.",
          a1: "e",
          a2: "n",
        },
        {
          q: "통장 잔고를 틈틈이 체크한다.",
          a1: "n",
          a2: "i",
        },
        {
          q: "내가 내는 세금의 종류와 내용에 대해 잘 알고 있다.",
          a1: "n",
          a2: "i",
        },
        {
          q: "물건을 살 때 여러 쇼핑몰을 둘러보며 가격을 비교해보고 산다.",
          a1: "n",
          a2: "ie",
        },
        {
          q: "취미활동에 쓰는 돈은 전혀 아깝지 않다.",
          a1: "e",
          a2: "n",
        },
        {
          q: "예쁜 것보다 실용적인 것이 최고다.",
          a1: "n",
          a2: "e",
        },
        {
          q: "스트레스를 받으면 쇼핑으로 해결한다.",
          a1: "i",
          a2: "n",
        },
        {
          q: "내 집 마련이나 1억 모으기와 같은 재정 목표를 수립하고 실천하려 노력한다.",
          a1: "n",
          a2: "ie",
        },
        {
          q: "여행에 가면 가성비를 따지는 것보다 즐기는 것에 중점을 둬야 한다고 생각한다.",
          a1: "e",
          a2: "n",
        },
        {
          q: "정가에 사면 손해보는 기분이 있어 소비를 미룬 적이 있다.",
          a1: "n",
          a2: "ie",
        },
        {
          q: "대부분의 경우 다음 월급날이 오기 전에 돈을 다 쓰는 경향이 있다.",
          a1: "i",
          a2: "n",
        },
      ],
    };
  },
  methods: {
    selectAnswer() {
      if (!this.status) {
        alert("얼른 고르지 못 해?");
      } else {
        this.$emit("select-answer", this.status);
        this.status = null;
      }
    },
  },
};
</script>

<style></style>
