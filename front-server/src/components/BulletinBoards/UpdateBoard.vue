<template>
  <div id="UpdateBoardComponent" class="container d-flex flex-column w-100">
    <div class="d-felx">
      <b-button @click="goBack">뒤로가기</b-button>
      <h1 style="text-align: center; margin-bottom: 30px">게시글 수정</h1>
    </div>
    <b-card-group deck>
      <b-card>
        <form class="d-flex flex-column" @submit.prevent="createArticle">
          <label for="title">제목 : </label>
          <input v-model="article.title" type="text" /><br />
          <label for="content">내용 : </label>
          <textarea v-model="article.content" cols="30" rows="10"></textarea
          ><br />
          <b-button variant="primary" @click="articleEdit">수정하기</b-button>
        </form>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "UpdateBoardComponent",
  data() {
    return {
      article: null,
      comment: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin; //로그인 여부
    },
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    goBack() {
      this.$emit("goBack", this.article);
    },
    getArticleDetail() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/${this.$route.params.articleId}/`,
        // url: `${API_URL}/api/v1/articles/20/`,     // 테스트용
      })
        .then((res) => {
          console.log(res);
          this.article = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    articleEdit() {
      console.log("수정요청");
      if (this.isLogin) {
        const title = this.article.title;
        const content = this.article.content;
        axios({
          method: "PUT",
          url: `${API_URL}/api/v1/articles/${this.$route.params.articleId}`,
          // url: `${API_URL}/api/v1/articles/20/`,     // 테스트용
          data: {
            title,
            content,
          },
          headers: {
            Authorization: `Token ${this.$store.state.user.token}`,
            // Authorization: `Token a365d5005ce82ab5dd1681e97e5042216dd2aa8a`, // 테스트용
          },
        })
          .then((res) => {
            console.log(res.data);
            this.article = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("로그인이필요합니다");
      }
    },
  },
};
</script>
