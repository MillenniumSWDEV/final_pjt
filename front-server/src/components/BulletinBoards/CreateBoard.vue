<!-- views/CreateView.vue -->
<template>
  <div id="CreateBoard" class="container d-flex flex-column w-50 mt-3">
    <div class="d-felx">
      <b-button @click="goBulletinBoard()">뒤로가기</b-button>
      <h1 style="text-align: center; margin-bottom: 30px">게시글 작성</h1>
    </div>
    <b-card-group deck>
      <b-card>
        <form class="d-flex flex-column" @submit.prevent="createArticle">
          <label for="title">제목 : </label>
          <input id="title" v-model.trim="title" type="text" /><br />
          <label for="content">내용 : </label>
          <textarea
            id="content"
            v-model="content"
            cols="30"
            rows="10"
          ></textarea
          ><br />
          <b-button id="submit" variant="primary" type="submit"
            >작성하기</b-button
          >
        </form>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "CreateBoard",
  data() {
    return {
      title: null,
      content: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
  },
  methods: {
    createArticle() {
      console.log("로그인여부", this.isLogin);
      if (this.isLogin) {
        const title = this.title;
        const content = this.content;

        if (!title) {
          alert("제목 입력해주세요");
          return;
        } else if (!content) {
          alert("내용 입력해주세요");
          return;
        }

        const payload = {
          title,
          content,
        };

        this.$store.dispatch("createArticle", payload);
        this.$router.push({
          name: "BulletinBoardView",
        });
      } else {
        alert("로그인이 필요한 페이지입니다.");
        this.$router.push({ name: "LogInView" }); // 로그인 페이지로 이동..
      }
    },
    goBulletinBoard() {
      this.$router.push({
        name: "BulletinBoardView",
      });
    },
  },
};
</script>

<style></style>
