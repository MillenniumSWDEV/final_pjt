<template>
  <div>
    <DetailBoard :article-id="$router.params" />
    {{ $route.params.articleId }}
  </div>
</template>

<script>
import DetailBoard from "@/components/BulletinBoards/DetailBoard.vue";

export default {
  components: {
    DetailBoard,
  },
  created() {
    // console.log("dddd", $route.params);
  },
};
</script>
