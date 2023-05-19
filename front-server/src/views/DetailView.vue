<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호 : {{ article?.id }}</p>
    <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p>
    <button @click="articleEdit">수정하기</button>
    <button @click="articleDelete">삭제하기</button>
    <hr>
    <div v-for="com in article?.comment_set" v-bind:key="com.id">
      <p>내용 - {{ com.content }}
        <input type="submit" id="delete" value="댓글삭제" @click="deleteComment(com.id)">
      </p>
    </div>
    <form @submit.prevent="createComment">
      <label for="comment">댓글 작성 : </label>
      <input id="comment" v-model.trim="comment" type="text" @keyup.enter="createComment">
      <input id="submit" type="submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailView",
  data() {
    return {
      article: null,
      comment: null
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
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
      console.log("edit");
    },
    articleDelete() {
      console.log("deleted");
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
      })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "ArticleView" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createComment() {
      const content = this.comment
      axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/`,
        data: { content }
      })
      .then(this.$router.go(0))
      .catch(error => console.log(error))
    },
    deleteComment(commentId) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
      })
      .them(this.$router.go(0))
      .catch(err => console.log(err))
    }
  },
};
</script>
