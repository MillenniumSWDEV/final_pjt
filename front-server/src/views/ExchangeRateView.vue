<template>
  <div>
    <h3>환율</h3>
    <div v-for="er in exchangeRates" :key="er.curnm">
      {{ er.cur_nm }}({{ er.cur_unit }}) - {{ er.ttb }} / {{ er.tts }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ExchangeRateView",
  computed: {
    exchangeRates() {
      return this.$store.state.exchangeRates;
    },
  },
  created() {
    this.getExRates();
  },
  methods: {
    getExRates() {
      this.$store.dispatch("getExRates");
    },
  },
};
</script>

<style></style>
