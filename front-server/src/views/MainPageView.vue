<template>
  <div class="MainPageView d-flex">
    <div class="d-flex flex-column">
      <ExchangeRate />
      <KakaoMap />
    </div>
  </div>
</template>

<script>
import ExchangeRate from "@/components/ExchangeRate/ExchangeRate.vue";
import KakaoMap from "@/components/KakaoMap/KakaoMap.vue";

export default {
  name: "MainPageView",
  components: {
    ExchangeRate,
    KakaoMap,
  },
};
</script>

<style></style>
