<template>
  <div class="fjs">
    <TournamentProducts />
    <!-- <GBTITest /> -->
  </div>
</template>

<script>
import GBTITest from "../components/GBTI/GBTITest.vue";
import TournamentProducts from "../components/Tournament/TournamentProducts.vue";

export default {
  name: "TestView",
  components: {
    TournamentProducts,
    // GBTITest,
  },
};
</script>
<style>
.fjs {
  display: flex;
  justify-content: space-around;
}
</style>
