<template>
  <div id="BoardList" style="width: 100%" class="mt-3">
    <h3 style="font-weight: 900">게시판</h3>
    
    <b-input-group class="mt-3">
      <b-form-input v-model="searchData"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="searchInput()">검색</b-button>
      </b-input-group-append>
    </b-input-group>
    <br/>
    <b-button class="mb-2" variant="outline-primary" @click="GoCreateView">글작성하기</b-button>

    <br/>
    <div style="background-color: #fff">
      <b-table
        striped
        hover
        :items="articles"
        @row-clicked="handleRowClicked"
      ></b-table>
    </div>
    <div v-if="articles.length !== 0"></div>
    <div v-else>
      <h4>없어요</h4>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
      style="justify-content: center"
    ></b-pagination>
  </div>
</template>

<script>
// import BoardListItem from "./BoardListItem.vue";

export default {
  name: "BoardList",
  components: {},
  data() {
    return {
      searchData: "",
      perPage: 10,
      currentPage: 1,
      items: [],
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
    isLogin(){
      return this.$store.state.user.isLogin //로그인 여부
    },
    articles() {
      const items = this.$store.state.article.articles.filter((item) =>
        item.title.includes(this.searchData)
      );
      console.log("나는 아이템이다", items);
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.items = this.$store.dispatch("getArticles");
    },
    fullName(value) {
      return `${value.first} ${value.last}`;
    },
    searchInput() {
      this.articles;
    },
    handleRowClicked(item) {
      // item 클릭 시, 다른 화면으로 이동하도록 처리
      this.$router.push({
        name: "DetailView",
        params: { articleId: item.id },
      });
    },
    GoCreateView(){
      if(this.isLogin){
        this.$router.push({
          name: "CreateView",
        })
      } else {
        alert('로그인이 필요한 페이지입니다.') 
      }
    },
  },
};
</script>

<style>
#BoardList {
  text-align: start;
}
</style>
