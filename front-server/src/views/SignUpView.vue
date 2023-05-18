<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input id="username" v-model.trim="username" type="text" /><br />

      <label for="password1"> password : </label>
      <input id="password1" v-model.trim="password1" type="password" /><br />

      <label for="password2"> password confirmation : </label>
      <input id="password2" v-model.trim="password2" type="password" />

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
    };
  },
  methods: {
    signUp() {
      if (this.password1 !== this.password2) {
        alert("비밀번호와 확인이 틀립니다.");
      } else {
        console.log(username, password1, password2);
      }
    },
  },
};
</script>
