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
        :value="[er.cur_nm, er.ttb, er.tts]"
      >
        {{ er.cur_nm }}({{ er.cur_unit }})
      </option>
    </select>
    <input v-model="curN" type="number" />
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
    selectedCur() {
      return this.cur;
    },
  },
  created() {
    this.getExRates();
  },
  methods: {
    getExRates() {
      this.$store.dispatch("getExRates");
    },
    CtoW() {
      if (typeof this.cur === "object") {
        this.WN = this.curN * this.cur[2];
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
    WtoC() {
      if (typeof this.cur === "object") {
        this.curN = this.WN / this.cur[1];
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
  },
};
</script>

<style></style>
