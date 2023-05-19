<template>
  <div>
    <h3>환율</h3>
  </div>
</template>

<script>
export default {
    name: 'ExchangeRateView',
    created() {
        this.getExRate()
    },
    methods: {
        getExRate() {
            this.$store.dispatch('getExRate')
        }
    }
}
</script>

<style>

</style>