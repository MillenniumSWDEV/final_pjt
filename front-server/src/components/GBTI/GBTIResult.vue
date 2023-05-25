<template>
  <div>
    {{ result }}
    <b-card
      :img-src="require(`@/assets/${result}.png`)"
      :img-alt="result"
      img-left
      :title="'당신은... ' + result"
      :sub-title="type[you].charactor"
      class="mb-3"
    >
      <b-card-text>
        {{ type[you].txt1 }}
      </b-card-text>
      <b-card-text>
        {{ type[you].txt2 }}
      </b-card-text>
      <b-card-text>
        {{ type[you]?.txt3 }}
      </b-card-text>
    </b-card>
    <DetailProducts :pd="type[you].osusume" prdt-type="S" />
  </div>
</template>

<script>
import DetailProducts from "../Products/DetailProducts.vue";

export default {
  components: {
    DetailProducts,
  },
  props: {
    testScore: Object,
  },
  data() {
    return {
      you: null,
      type: {
        개미: {
          charactor: "티끌 모아 태산!",
          txt1: `소비에 있어 항상 신중하고 쓸데없는 소비가 매우 적은 당신!`,
          txt2: `가끔은 나를 위한 선물도 필요하지 않을까요?`,
          txt3: `그런 당신을 위해 상한 금액이 높으면서 이율이 높은 이 상품을 추천드립니다!`,
          osusume: 28,
        },
        소확행: {
          charactor: "소소하지만 확실한 행복!",
          txt1: `고생한 나를 위한 작은 선물을 즐겨하는 당신!`,
          txt2: `분명 소소하다 생각한 선물들이었는데 통장 잔고는 왜이리 아파하는지...`,
          txt3: `우리 조금만 더 미래를 위해 차근차근 아끼는 습관을 들여볼까요?`,
          osusume: 55,
        },
        정승: {
          charactor: "개같이 벌어서 정승같이 쓰자!",
          txt1: `목적을 위해서라면 악착같이 모은다! 규칙적인 소비가 몸에 익은 당신!`,
          txt2: `더 이상 여행 다이어트는 그만!`,
          txt3: `규모에 맞게 돈을 쓰는 방법을 이미 알고 있는 당신에게 상한 금액이 높고 이율이 높은 적금을 추천드립니다.`,
          osusume: 28,
        },
        베짱이: {
          charactor: "소는 뒤에서, 기회는 앞에서!",
          txt1: `당신은 마음에 드는 물건을 발견하면 곧장 지갑부터 열어버리는 YOLO주의자!`,
          txt2: `소비 절제력이 약한 당신은 저축 기간이 짧은 적금부터 시작해서 소비 습관을 개선해 나가는 것이 중요합니다.`,
          osusume: 55,
        },
      },
    };
  },
  computed: {
    result() {
      if (this.testScore.impulse < 5 && this.testScore.enjoy <= 5) {
        this.youR("개미");
        return "개미";
      }
      if (this.testScore.impulse >= 5 && this.testScore.enjoy <= 5) {
        this.youR("소확행");
        return "소확행";
      }
      if (this.testScore.impulse < 5 && this.testScore.enjoy > 5) {
        this.youR("정승");
        return "정승";
      } else {
        this.youR("베짱이");
        return "베짱이";
      }
    },
  },
  methods: {
    youR(me) {
      this.you = me;
    },
  },
};
</script>

<style></style>
