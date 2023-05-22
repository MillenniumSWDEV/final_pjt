<template>
  <div>
    <h3>환율</h3>
    <div v-for="er in exchangeRates" :key="er.curnm">
      {{ er.cur_nm }}({{ er.cur_unit }}) - {{ er.ttb }} / {{ er.tts }}
    </div>
    <select v-model="cur">
      <option>화폐를 선택하세요</option>
      <option
        v-for="er in exchangeRates"
        :key="er.cur_unit"
        :value="{ unit: er.cur_unit, ttb: er.ttb, tts: er.tts }"
      >
        {{ er.cur_nm }}({{ er.cur_unit }})
      </option>
    </select>
    <input v-model="curN" type="number" />
    {{ selectedCur }}
    <button @click="CtoW">$</button>
    <br />
    <input v-model="WN" type="number" />
    <button @click="WtoC">₩</button>
  </div>
</template>

<script>
export default {
  name: "ExchangeRateView",
  data() {
    return {
      cur: "화폐를 선택하세요",
      curN: 0,
      WN: 0,
    };
  },
  computed: {
    exchangeRates() {
      return this.$store.state.exchangeRates;
    },
    // 컴퓨티드 속성에 함수를 넣는 것으로 값을 초기화하고, 보기 쉽도록 인풋 값 뒤에 화폐유닛을 리턴해줍니다.
    selectedCur() {
      this.changedC();
      return this.cur.unit;
    },
  },
  created() {
    this.getExRates();
  },
  methods: {
    getExRates() {
      this.$store.dispatch("getExRates");
    },
    // 인풋 값 초기화
    changedC() {
      this.curN = 0;
      this.WN = 0;
    },
    // 타국 화폐 >>> 원화
    CtoW() {
      if (typeof this.cur === "object") {
        this.WN = this.curN * this.cur.tts;
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
    // 원화 >>> 타국 화폐
    WtoC() {
      if (typeof this.cur === "object") {
        this.curN = this.WN / this.cur.ttb;
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
  },
};
</script>

<style></style>
