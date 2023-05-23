<template>
    <div>
      <h1>LogIn Page</h1>
      <form @submit.prevent="login">
        <label for="username">ID : </label>
        <input id="username" v-model="username" type="text" /><br />
  
        <label for="password">비밀번호 : </label>
        <input id="password" v-model="password" type="password" /><br />
  
        <input type="submit" value="logIn" />
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "LogInView",
    data() {
      return {
        username: null,
        password: null,
      };
    },
    computed:{
      isLogin(){
        return this.$store.getters.isLogin //로그인 여부
      }
    },
    created() {
      if (this.isLogin){
        alert("로그아웃해주세요");
        this.$router.push({name: 'ArticleView'}) // 로그인 페이지로 이동..
  
      } else {
      }
    },
    methods: {
      login() {
        const username = this.username;
        const password = this.password;
  
        const payload = {
          username,
          password,
        };
  
        this.$store.dispatch("login", payload);
      },
    },
  };
  </script>
  