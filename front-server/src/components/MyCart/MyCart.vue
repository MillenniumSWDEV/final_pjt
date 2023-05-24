<template>
  <div >
    <h4>deposit Cart</h4>
    <div v-for="(item, index) in depositCart" :key="index">
        <p>{{ item.fin_prdt_cd }}</p>
        <p>{{ item.kor_co_nm }}</p>
        <p>{{ item.fin_prdt_nm }}</p>
        <p>{{ item.etc_note }}</p>
        <p>{{ item.join_deny }}</p>
        <p>{{ item.join_member }}</p>
        <p>{{ item.join_way }}</p>
        <p>{{ item.spcl_cnd }}</p>
        <p>{{ item.carted_user }}</p>
        <hr>
    </div>
    <h4>saving Cart</h4>
    <div v-for="(item, index) in savingCart" :key="index">
        <p>{{ item.fin_prdt_cd }}</p>
        <p>{{ item.kor_co_nm }}</p>
        <p>{{ item.fin_prdt_nm }}</p>
        <p>{{ item.etc_note }}</p>
        <p>{{ item.join_deny }}</p>
        <p>{{ item.join_member }}</p>
        <p>{{ item.join_way }}</p>
        <p>{{ item.spcl_cnd }}</p>
        <p>{{ item.carted_user }}</p>
        <hr>
    </div>
  </div>
</template>

<script>
const API_URL = "http://127.0.0.1:8000";

export default {
    data(){
        return {
            depositCart : this.$store.state.finlife.depositCart,
            savingCart : this.$store.state.finlife.savingCart,
        }
    },
    created(){
        this.$store.dispatch('getDepositCart')
        this.$store.dispatch('getSavingCart')
    },
}
</script>

<style>

</style>