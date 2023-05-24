<template>
  <div id="DetailBoard" class="container d-flex flex-column w-50 mt-3">
    <div v-if="!showUpdateBoard" class="d-felx">
      <b-button @click="goBulletinBoard()">뒤로가기</b-button>
      <h1 style="text-align: center; margin-bottom: 30px">
        {{ article?.id }}번 게시글
      </h1>
    </div>
    <b-card-group v-if="!showUpdateBoard" deck>
      <b-card :header="`작성자: ${article?.username}`" header-tag="header">
        <p>
          작성 날짜 / 시간 :
          {{
            article?.created_at.slice(0, 19).replace("T", " / ")
          }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 수정 날짜 / 시간 :
          {{ article?.updated_at.slice(0, 19).replace("T", " / ") }}
        </p>
        <h4 style="font-size: 20px; font-weight: 900">내용</h4>
        <p class="pb-3">{{ article?.content }}</p>
        <div class="d-flex justify-content-end">
          <b-button variant="warning" @click="showUpdateBoard = true"
            >수정하러가기</b-button
          >
          <b-button variant="danger" @click="articleDelete">삭제하기</b-button>
        </div>
        <hr />
        <div v-for="com in article?.comment_set" :key="com.id">
          <p>
            {{ com.username }} - {{ com.content }}
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
          <input id="submit" type="submit" />
        </form>
      </b-card>
    </b-card-group>
    <UpdateBoard v-if="showUpdateBoard" @goBack="handleGoBack" />
  </div>
</template>

<script>
import axios from "axios";
import UpdateBoard from "./UpdateBoard.vue";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailBoard",
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
      return this.$store.state.article.article;
    },
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
    // comment_set(){
    //   console.log(this.article.comment_set)
    //   return this.article.comment_set
    // }
  },
  watch: {
    number: function (val, oldval) {
      console.log(`값이 ${oldval}에서 ${val}로 변함`);
    },
  },
  created() {
    this.getArticleDetail();
    console.log("xxxx", this.commentList);
  },
  methods: {
    goBulletinBoard() {
      this.$router.push({
        name: "BulletinBoardView",
      });
    },
    handleGoBack(updatedArticle) {
      this.showUpdateBoard = false;
      // this.article = updatedArticle;
    },
    getArticleDetail() {
      this.$store.dispatch("getArticleDetail", this.$route.params.articleId);
    },
    articleDelete() {
      console.log("삭제요청");
      console.log("로그인여부", this.isLogin);
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
            this.$router.push({ name: "BulletinBoardView" });
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
      console.log("로그인여부", this.isLogin);
      if (this.isLogin) {
        console.log(this.comment);
        const content = this.comment;
        const articleId = this.$route.params.articleId;
        const payload = {
          content,
          articleId,
        };
        this.$store.dispatch("createComment", payload);
        this.comment = "";
      } else {
        alert("로그인이필요합니다");
      }
    },
    deleteComment(comment) {
      console.log("삭제. 댓글", comment);
      this.$store.dispatch("deleteComment", comment);
    },
  },
};
</script>
<style scoped>
.btn-warning {
  margin-right: 20px;
}
.card-header {
  font-size: 20px;
  font-weight: 900;
}
</style>
