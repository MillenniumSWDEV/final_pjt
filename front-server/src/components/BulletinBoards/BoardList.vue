<template>
  <div id="BoardList">
    <h3>BoardList</h3>
    <div v-if="articles.length !== 0">
      <BoardListItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <div v-else>
      <h4>없어요</h4>
    </div>
  </div>
</template>

<script>
import BoardListItem from "./BoardListItem.vue";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style>
#BoardList {
  text-align: start;
}
</style>
