<template>
  <div>
    <h4>예금예금~!</h4>
    <div v-for="dp, idx in this.depositProducts" v-bind:key="idx">
        {{ idx+1 }} - {{ dp.fin_prdt_nm }}
    </div>
  </div>
</template>

<script>
export default {
    name: 'DepositPoducts',
    computed: {
    depositProducts() {
      return this.$store.state.depositProducts;
    },
  },
}
</script>

<style>

</style>