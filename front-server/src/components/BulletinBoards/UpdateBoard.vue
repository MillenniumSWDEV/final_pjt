<template>
  <div>
    <h1>게시글수정하기</h1>
    <p>글 번호 : {{ article?.id }}</p>
    <p>
      제목 : <input type="text" v-model="article.title" />
    </p>
    <p>
      내용 : <textarea v-model="article.content"></textarea>
    </p>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p>
    <p>작성자 : {{ article?.user }}</p>
    <button @click="goBack">뒤로가기</button> 
    <button @click="articleEdit">수정하기</button> 
    <hr />
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
  created() {
    this.getArticleDetail();
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin //로그인 여부
    },
  },
  methods: {
    goBack() {
      this.$emit('goBack', this.article);
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
      if(this.isLogin){
          const title = this.article.title
          const content = this.article.content
          axios({
              method: "PUT",
              url: `${API_URL}/api/v1/articles/${this.$route.params.articleId}`,
              // url: `${API_URL}/api/v1/articles/20/`,     // 테스트용   
              data: {
                title, content
              },
              headers: {
              Authorization: `Token ${this.$store.state.user.token}`,
              // Authorization: `Token a365d5005ce82ab5dd1681e97e5042216dd2aa8a`, // 테스트용
              },
          })
          .then((res) => {
              console.log(res.data)
              this.article = res.data
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
          alert('로그인이필요합니다')
      }
    },
  },
  }
</script>
