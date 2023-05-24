<template>
  <div class="MainPageView d-flex justify-content-evenly container">
    <div class="mt-3">
      <ExchangeRate style="opacity: 95%; margin-bottom: 20px;" />
      <KakaoMap style="opacity: 95%;"/>
    </div>
    <div class="mt-3 flex-fill" style="overflow:hidden">
      <ImageSlider />
    </div>
  </div>
</template>

<script>
import ExchangeRate from "@/components/ExchangeRate/ExchangeRate.vue";
import KakaoMap from "@/components/KakaoMap/KakaoMap.vue";
import ImageSlider from "@/components/ImageSlider/ImageSlider.vue";

export default {
  name: "MainPageView",
  components: {
    ExchangeRate,
    KakaoMap,
    ImageSlider,
  },
};
</script>

<style></style>
