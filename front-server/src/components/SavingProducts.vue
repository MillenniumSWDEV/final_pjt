<template>
  <div>
    <h4>저끔저끔~!</h4>
  <div v-for="sp, idx in this.savingProducts" v-bind:key="idx">
        {{ idx+1 }} - {{ sp.fin_prdt_nm }}
    </div>
  </div>
</template>

<script>
export default {
    name: 'SavingProducts',
    computed: {
    savingProducts() {
      return this.$store.state.savingProducts;
    },
  },
}
</script>

<style>

</style>