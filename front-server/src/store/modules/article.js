import axios from "axios";
import router from "../../router";

const API_URL = "http://127.0.0.1:8000";

const article = {
  state: {
    articles: [],
    article: [],
  },
  mutations: {
    // 게시글
    GET_ARTICLES(state, newArticle) {
      state.articles = newArticle;
    },
    GET_ARTICLE_DETAIL(state, articleDetail) {
      state.article = articleDetail;
    },
  },
  actions: {
    // 게시글 axios
    getArticles(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/`,
      })
        .then((res) => {
          context.commit("GET_ARTICLES", res.data);
        })
        .catch((err) => {
          // 404 싫어요
          context.commit("GET_ARTICLES", []);
        });
    },
    // article의 id로 detail을 불러오는 함수
    getArticleDetail(context, articleId) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/${articleId}/`,
      })
        .then((res) => {
          context.commit("GET_ARTICLE_DETAIL", res.data);
        })
        .catch((err) => {});
    },
    // 게시글작성
    createArticle(context, payload) {
      const title = payload.title;
      const content = payload.content;

      axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/`,
        data: { title, content },
        headers: {
          Authorization: `Token ${this.state.user.token}`,
        },
      })
        .then((res) => {
          this.dispatch("getArticles");
        })
        .catch((err) => {});
    },
    // 게시글 수정
    updateArticle(context, payload) {
      const title = payload.title;
      const content = payload.content;
      const articleId = payload.articleId;

      axios({
        method: "put",
        url: `${API_URL}/api/v1/articles/${articleId}/`,
        data: {
          title,
          content,
        },
        headers: {
          Authorization: `Token ${this.state.user.token}`,
          // Authorization: `Token a365d5005ce82ab5dd1681e97e5042216dd2aa8a`, // 테스트용
        },
      })
        .then((res) => {
          context.commit("GET_ARTICLE_DETAIL", res.data);
        })
        .catch((err) => {});
    },
    // 게시글 지우는 코드
    articleDelete(context, articleId) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/articles/${articleId}/`,
      })
        .then((res) => {
          this.$router.push({ name: "ArticleView" });
        })
        .catch((error) => {});
    },
    // 댓글 달기
    createComment(context, payload) {
      const articleId = payload.articleId;
      const content = payload.content;
      axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/${articleId}/comments/`,
        data: { content },
        headers: {
          Authorization: `Token ${this.state.user.token}`,
        },
      })
        .then((res) => {
          this.dispatch("getArticleDetail", res.data.article);
        })
        .catch((error) => console.log(error, context));
    },
    // 댓글 지우기
    deleteComment(context, comment) {
      const commentId = comment.id;
      const articleID = comment.article;
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${this.state.user.token}`,
        },
      })
        .then((res) => {
          this.dispatch("getArticleDetail", articleID);
        })
        .catch((err) => console.log(err, context));
    },
  },
};

export default article;
