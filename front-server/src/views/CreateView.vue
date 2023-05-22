<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input id="title" v-model.trim="title" type="text" /><br />
      <label for="content">내용 : </label>
      <textarea id="content" v-model="content" cols="30" rows="10"></textarea
      ><br />
      <input id="submit" type="submit" />
    </form>
  </div>
</template>

<script>
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "CreateView",
  data() {
    return {
      title: null,
      content: null,
    };
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin //로그인 여부
    }
  },
  methods: {
    createArticle() {
      if(this.isLogin){
        const title = this.title;
        const content = this.content;
  
        if (!title) {
          alert("제목 입력해주세요");
          return;
        } else if (!content) {
          alert("내용 입력해주세요");
          return;
        }
  
        const payload ={
          title, content
        }
  
        this.$store.dispatch('createArticle', payload)
      }else{
        alert('로그인이 필요한 페이지입니다.')
        this.$router.push({name: 'LogInView'}) // 로그인 페이지로 이동..
      }
    },
  },
}
</script>

<style></style>
