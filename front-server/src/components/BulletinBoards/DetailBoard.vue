<template>
  <div>
    <div v-if="!showUpdateBoard">
      <h1>게시글상세</h1>
      <p>글 번호 : {{ article?.id }}</p>
      <p>제목 : {{ article?.title }}</p>
      <p>내용 : {{ article?.content }}</p>
      <p>작성시간 : {{ article?.created_at }}</p>
      <p>수정시간 : {{ article?.updated_at }}</p>
      <p>작성자 : {{ article?.username }}</p>
      <button @click="showUpdateBoard = true">수정하러가기</button>
      <button @click="articleDelete">삭제하기</button>
      <hr />
      <div v-for="com in article?.comment_set" :key="com.id">
        <p>
          {{com.username}} - {{ com.content }}
          <input
            id="delete"
            type="submit"
            value="댓글삭제"
            @click="deleteComment(com)"
          />
        </p>
      </div>
      <form @submit.prevent="createComment">
        <label for="comment">댓글 작성 : </label>
        <input
          id="comment"
          v-model.trim="comment"
          type="text"
          @keyup.enter="submit"
        />
        <input id="submit" type="submit"/>
      </form>
    </div>
    <UpdateBoard v-if="showUpdateBoard" @goBack="handleGoBack" />
  </div>
</template>

<script>
import axios from "axios";
import UpdateBoard from "./UpdateBoard.vue";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailView",
  components: {
    UpdateBoard,
  },
  props: {
    articleId: String,
  },
  data() {
    return {
      // article: this.$store.state.article.article,
      comment: null,
      showUpdateBoard: false,
      // commentList: this.article.comment_set,
    };
  },
  computed: {
    article() {
      return this.$store.state.article.article
    },
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
    // comment_set(){
    //   console.log(this.article.comment_set)
    //   return this.article.comment_set
    // }
  },
  created() {
    this.getArticleDetail();
    console.log('xxxx',this.commentList)
  },
  watch:{
    number: function(val,oldval){
      console.log(`값이 ${oldval}에서 ${val}로 변함`)
    }
  },
  methods: {
    handleGoBack(updatedArticle) {
      this.showUpdateBoard = false;
      // this.article = updatedArticle;
    },
    getArticleDetail() {
      this.$store.dispatch('getArticleDetail', this.$route.params.articleId)
    },
    articleDelete() {
      console.log("삭제요청");
      console.log('로그인여부', this.isLogin)
      if (this.isLogin) {
        axios({
          method: "DELETE",
          url: `${API_URL}/api/v1/articles/${this.$route.params.articleId}`,
          // url: `${API_URL}/api/v1/articles/20/`,     // 테스트용
          headers: {
            Authorization: `Token ${this.$store.state.user.token}`,
            // Authorization: `Token a365d5005ce82ab5dd1681e97e5042216dd2aa8a`, // 테스트용
          },
        })
          .then((res) => {
            console.log(res.data);
            this.$router.push({ name: "MainPageView" });
            console.log("삭제완료");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("로그인이필요합니다");
      }
    },
    createComment() {
      console.log('로그인여부', this.isLogin)
      if (this.isLogin){
        console.log(this.comment)
        const content= this.comment
        const articleId = this.$route.params.articleId
        const payload = {
          content,articleId
        }
        this.$store.dispatch('createComment', payload)
      } else {
        alert("로그인이필요합니다");
      }
    },
    deleteComment(comment) {
      console.log('삭제. 댓글', comment)
      this.$store.dispatch('deleteComment', comment )
    },
  },
};
</script>
