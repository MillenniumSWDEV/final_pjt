<template>
  <div id="BoardList">
    <h3>BoardList</h3>
    <div>
    <b-table striped hover :items="items"></b-table>
  </div>
    <div v-if="articles.length !== 0">
    </div>
    <div v-else>
      <h4>없어요</h4>
    </div>
  </div>
</template>

<script>
// import BoardListItem from "./BoardListItem.vue";

export default {
  name: "BoardList",
  components: {
    
  },
  computed: {
    articles() {
      return this.$store.state.article.articles;
    },
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.$store.dispatch("getArticles");
    },
    fullName(value) {
        return `${value.first} ${value.last}`
      },
  },
  data() {
      return {
        items: this.$store.state.article.articles
      }
    },
  }
</script>

<style>
#BoardList {
  text-align: start;
}
</style>
