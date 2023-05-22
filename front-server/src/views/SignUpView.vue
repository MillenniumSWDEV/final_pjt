<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">ID : </label>
      <input id="username" v-model.trim="username" type="text" /><br />

      <label for="password1"> password : </label>
      <input id="password1" v-model.trim="password1" type="password" /><br />

      <label for="password2"> password confirmation : </label>
      <input id="password2" v-model.trim="password2" type="password" /><br />

      <label for="email">email : </label>
      <input id="email" v-model.trim="email" type="email" /><br />

      <label for="nickname">nickname : </label>
      <input id="nickname" v-model.trim="nickname" type="text" /><br />

      <label for="age">age : </label>
      <input id="age" v-model.trim="age" type="number" /><br />

      <label for="job">직업 : </label>
      <select v-model.trim="job" name="job">
        <option value="학생">학생</option>
        <option value="직장인">직장인</option>
        <option value="전업주부">전업주부</option>
        <option value="무직">Music</option>
        <option value="기타">기타</option>
      </select>
      <br />

      <input type="submit" value="SignUp" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      email: null,
      nickname: null,
      job: null,
      age: null,
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
    signUp() {
      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;
      const email = this.email;
      const nickname = this.nickname;
      const job = this.job;
      const age = this.age;
      if (this.password1 !== this.password2) {
        alert("비밀번호와 확인이 틀립니다.");
      } else {
        const payload = {
          username,
          password1,
          password2,
          email,
          nickname,
          job,
          age,
        };
        this.$store.dispatch("signUp", payload);
      }
    },
  },
};
</script>
