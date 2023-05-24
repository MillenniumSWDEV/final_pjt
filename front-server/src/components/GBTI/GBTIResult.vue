<template>
  <div style="display: flex">
    <b-card
      :img-src="require(`@/assets/${result}.png`)"
      :img-alt="result"
      img-left
      :title="'당신은... ' + result"
      :sub-title="type[you].charactor"
      class="mb-3"
    >
      <b-card-text>
        {{ type[you].txt }}
      </b-card-text>
      <b-card-text>
        {{ type[you].osusume }}
      </b-card-text>
    </b-card>
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
      type: {
        개미: {
          charactor: "티끌 모아 태산!",
          txt: `당신은 소비에 있어 항상 신중하고 쓸데없는 소비가 매우 적습니다.
                당신은 이미 규모에 맞게 돈을 쓰는 방법을 알고 있기 때문에 저축 기간이 길고 이율이 높은 적금을 추천드립니다.`,
          osusume: "저축 기간이 길고 이율이 높은 적금",
        },
        소확행: {},
        정승: {},
        베짱이: {
          charactor: "소는 뒤에서, 기회는 앞에서!",
          txt: `당신은 마음에 드는 물건을 발견하면 곧장 지갑부터 열어버리는 YOLO주의자.
                소비 절제력이 약한 당신은 저축 기간이 짧은 적금부터 시작해서 소비 습관을 개선해 나가는 것이 중요합니다.`,
          osusume: "카카오뱅크 26주적금",
          link: "",
        },
      },
    };
  },
  computed: {
    result() {
      if (this.testScore.impulse < 5 && this.testScore.enjoy < 5) {
        this.youR("개미");
        return "개미";
      }
      if (this.testScore.impulse >= 5 && this.testScore.enjoy < 5) {
        this.youR("소확행");
        return "소확행";
      }
      if (this.testScore.impulse < 5 && this.testScore.enjoy >= 5) {
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
