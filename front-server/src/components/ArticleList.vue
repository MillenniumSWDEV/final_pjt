<template>
  <div class="article-list">
    <h3>Article List</h3>
    <div v-if="articles.length !== 0">
      <ArticleListItem
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
import ArticleListItem from "./ArticleListItem.vue";

export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style>
.article-list {
  text-align: start;
}
</style>
