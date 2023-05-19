<template>
  <div>
    <h3>환율</h3>
    <div v-for="er in exchangeRates" v-bind:key="er.curnm">
      {{ er.cur_unit }} - {{ er.ttb }} / {{ er.tts }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRateView',
  created() {
    this.getExRates()
  },
  methods: {
    getExRates() {
      this.$store.dispatch('getExRates')
    }
  },
  computed: {
    exchangeRates() {
      return this.$store.state.exchangeRates;
    },
  },
}
</script>

<style>

</style>